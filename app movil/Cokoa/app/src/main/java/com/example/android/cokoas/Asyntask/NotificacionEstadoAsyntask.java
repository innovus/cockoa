package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

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
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 1/11/2016.
 */
public class NotificacionEstadoAsyntask extends AsyncTask<String,Void,Void> {
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = NotificacionEstadoAsyntask.class.getSimpleName();
    public NotificacionEstadoAsyntask(Activity activity){
        super();
        this.activity=activity;
    }

    @Override
    protected Void doInBackground(String... params) {

        JSONObject jsonObjectNotificacion = new JSONObject();

        sessionManager = new SessionManager(activity.getApplication());
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;
        // Contendra las respuesta del JSON en un Araylist
        String forecastJsonStr = null;

        try {
            jsonObjectNotificacion.put("id_notificacion", params[0]);

            // Construir la dirección URL para el appi materias
            // Posibles parámetros están disponibles en la página de la API de materias del liceo.
            //http://localhost:3000/estudiantes/materias/notalogro/1-200
            URL url = new URL(serverUrls + "estudiantes/notificaciones/estado");
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("PUT");
            urlConnection.setRequestProperty("Content-Type", "application/json");
            String token = sessionManager.getKeyToken();
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonObjectNotificacion.toString());
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

        } catch (IOException e) {
            Log.e(LOG_TAG, "Error ", e);
            // Si el código no consiguió con éxito los datos de la actividad,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 204) {
                    ArrayList a = new ArrayList();
                    a.add(0,"204");
                    return null;
                }

            } catch (IOException e1) {
                e1.printStackTrace();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (final IOException e) {
                    Log.e(LOG_TAG, "Error ", e);
                }
            }
        }

        return null;
    }
}
