package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.util.Log;
import android.view.Gravity;

import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.SessionManager.SessionManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by juancarlospantoja@hotmail.com on 11/01/2017.
 */
public class GuardarTokenFirebaseAsyntask extends AsyncTask<String,Void,Void> {

    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    static private final String LOG_TAG = GuardarTokenFirebaseAsyntask.class.getSimpleName();
    ProgressDialog progressDialog;

    public GuardarTokenFirebaseAsyntask(Activity activity){
        super();
        this.activity = activity;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        progressDialog = new ProgressDialog(activity);
        progressDialog.setMessage("Cargando...");
        progressDialog.setIndeterminate(false);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        progressDialog.setCancelable(false);
        progressDialog.getWindow().setGravity(Gravity.CENTER);
        progressDialog.show();
    }

    @Override
    protected Void doInBackground(String... params) {
        JSONObject jsonObject = new JSONObject();
        sessionManager = new SessionManager(activity.getApplication());
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un String
        String forecastJsonStr = null;

        //jsonObjectNotificacion.put("id_notificacion", params[0]);
        try {
            jsonObject.put("token_dispositivo", params[0]);//token_dispositivo
            URL url = new URL( serverUrls+ "estudiantes/dispositivo");

            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");
            String token = sessionManager.getKeyToken();
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonObject.toString());
            out.close();
            urlConnection.connect();

            // lee Respons de entrada en una cadena
            InputStream inputStream = urlConnection.getInputStream();
            StringBuffer buffer = new StringBuffer();

            if (inputStream == null) {
                // Nothing to do.
                return null;
            }

            reader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            while ((line = reader.readLine()) != null) {
                // Ya que es JSON , la adición de una nueva línea no es necesario ( no afectará el análisis sintáctico )
                // De modo hace que la depuración sea mucho más fácil
                // Búfer para la depuración.
                buffer.append(line + "\n");
            }

            if (buffer.length() == 0) {
                // Stream was empty.  No point in parsing.
                return null;
            }
            if (buffer.length() == 0) {
                // Stream was empty.  No point in parsing.
                return null;
            }
            forecastJsonStr = buffer.toString();

            Log.v("revisar json ", "Json String" + forecastJsonStr);

        } catch (JSONException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        progressDialog.dismiss();
    }
}
