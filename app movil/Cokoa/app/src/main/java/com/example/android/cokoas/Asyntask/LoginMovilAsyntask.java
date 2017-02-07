package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;
import com.google.firebase.iid.FirebaseInstanceId;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by ASUS on 14/12/2016.
 */
public class LoginMovilAsyntask extends AsyncTask<String, Void, String[]> {
    SessionManager sessionManager;
    private EditText editCodigo, editPassword;
    private Activity activity;
    // String serverUrls = com.acarolabs.a3dent.AppConstants.serverUrl;
    static String serverUrls = AppConstants.serverLoginMovil;
    String parametro1 = AppConstants.parametro3;
    String parametro2 = AppConstants.parametro2;
    static private final String LOG_TAG = LoginMovilAsyntask.class.getSimpleName();

    public LoginMovilAsyntask(Activity activity) {
        this.activity = activity;
    }

    @Override
    protected String[] doInBackground(String... params) {
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un String
        String forecastJsonStr = null;

        try {
            // Construir la dirección URL para el appi login
            // Posibles parámetros están disponibles en la página de la API de login de liceo.
            JSONObject jsonParam = new JSONObject();
            jsonParam.put(parametro1, params[0]);
            jsonParam.put(parametro2, params[1]);

            URL url = new URL( serverUrls+ "loginmovil");

            //Crear el request para el liceo, abre una conexión POST
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");


            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonParam.toString());
            out.close();
            //urlConnection.setConnectTimeout(1000);
            //urlConnection.setReadTimeout(1000);
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
            Log.e(LOG_TAG, "catcht error 1 ", e);
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                if (statuss == 500) {
                    String[] code = new String[1];
                    code[0] = "500";
                    Log.v("revisar status ", "statuss" + statuss);
                    return code;
                }
                Log.e(LOG_TAG, "por aqui1 ", e);
            } catch (IOException e1) {
                e1.printStackTrace();
                Log.e(LOG_TAG, "o por aca ", e);
                return null;
            }
            Log.v("revisar status ", "Json String" + statuss);
            //  return null;
            // Si el código no consiguió con éxito los datos del area,
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
                    Log.e(LOG_TAG, "cathet error 2 ", e);
                }
            }
        }
        try {
            return getToken(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("catcht errror 3", e.getMessage(), e);
            e.printStackTrace();
            return null;
        }

    }


    @Override
    protected void onPostExecute(String[] result) {
        if (result != null) {
            if (result[0].equals("500")) {
                editCodigo = (EditText) activity.findViewById(R.id.input_codigo);
                int position = editCodigo.length();
                editCodigo.setSelection(position);
                Button button = (Button) activity.findViewById(R.id.codigo_sign_in_button);
                button.setClickable(true);
                Toast toast1 =
                        Toast.makeText(activity, "Datos Incorrectos. Vuelve a intentarlo.", Toast.LENGTH_SHORT);
                toast1.show();
            } else {
                editCodigo = (EditText) activity.findViewById(R.id.input_codigo);
                editPassword = (EditText) activity.findViewById(R.id.input_password);
                sessionManager = new SessionManager(activity.getApplication());
                sessionManager.createLoginSession(result[0], editCodigo.getText().toString(), editPassword.getText().toString(), result[1]);
                if(result[1].equals("7")){
                    new GuardarTokenFirebaseAsyntask(activity).execute(FirebaseInstanceId.getInstance().getToken());
                }
                Intent intent = new Intent(activity, MainActivity.class);
                activity.startActivity(intent);
                activity.finish();
            }
        } else {
            editCodigo = (EditText) activity.findViewById(R.id.input_codigo);
            int position = editCodigo.length();
            editCodigo.setSelection(position);
            Toast toast1 =
                    Toast.makeText(activity, "No se ha podido establecer conexión", Toast.LENGTH_SHORT);
            toast1.show();
        }

    }

    public static String[] getToken(String tokenJsonStr) throws JSONException {

        if (tokenJsonStr != null) {
            JSONObject tokenJson = new JSONObject(tokenJsonStr);

            JSONObject jsonObject = new JSONObject(tokenJsonStr);
            String[] tokenUser = new String[2];


            tokenUser[0] = jsonObject.getString("token");




            tokenUser[1] = doInBackgroundRol(tokenUser[0]);
            return tokenUser;
        }
        return null;

    }

    public static String doInBackgroundRol(String token){
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un String
        String forecastJsonStr = null;

        try {
            // Construir la dirección URL para el appi login
            // Posibles parámetros están disponibles en la página de la API de login de liceo.
            JSONObject jsonParam = new JSONObject();
            jsonParam.put("token", token);


            URL url = new URL( serverUrls+ "infotoken");

            //Crear el request para el liceo, abre una conexión POST
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");


            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonParam.toString());
            out.close();
            //urlConnection.setConnectTimeout(1000);
            //urlConnection.setReadTimeout(1000);
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
            Log.e(LOG_TAG, "catcht error 1 ", e);
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                if (statuss == 500) {
                    String code = "500";

                    Log.v("revisar status ", "statuss" + statuss);
                    return code;
                }
                Log.e(LOG_TAG, "por aqui1 ", e);
            } catch (IOException e1) {
                e1.printStackTrace();
                Log.e(LOG_TAG, "o por aca ", e);
                return null;
            }
            Log.v("revisar status ", "Json String" + statuss);
            //  return null;
            // Si el código no consiguió con éxito los datos del area,
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
                    Log.e(LOG_TAG, "cathet error 2 ", e);
                }
            }
        }
        try {
            return getRol(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("catcht errror 3", e.getMessage(), e);
            e.printStackTrace();
            return null;
        }
    }

    public static String getRol(String rolJson) throws JSONException{
        if(rolJson!=null){
            JSONObject jsonObject = new JSONObject(rolJson);
            String rol = jsonObject.getString("rol");
            return rol;
        }

        return null;
    }


}
