package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.NotaActividadProfesor;
import com.example.android.cokoas.SessionManager.SessionManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by ASUS on 01/08/2016.
 */
public  class NotaActividadAsyntask extends AsyncTask<Void, Void, ArrayList<NotaActividadProfesor>> {
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = NotaActividadAsyntask.class.getSimpleName();

    private Activity activity;


    public NotaActividadAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    protected ArrayList<NotaActividadProfesor> doInBackground(Void... params) {
        sessionManager = new SessionManager(activity.getApplication());
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un Araylist
        String forecastJsonStr = null;

        try {
            // Construir la dirección URL para el appi materias
            // Posibles parámetros están disponibles en la página de la API de materias del liceo.
            URL url = new URL(serverUrls + "api/docentes/cargas/13375/logros/actividades/notas");
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            String token = sessionManager.getKeyToken();
            Log.v("tokenSessionManager", "Json String" + token);
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
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
            // Si el código no consiguió con éxito los datos del area,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 400) {
                    ArrayList a = new ArrayList();
                    a.add(0, "400");
                    return a;
                }

            } catch (IOException e1) {
                e1.printStackTrace();
            }
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
        try {
            return getNotaActividadProfesor(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }

    public ArrayList<NotaActividadProfesor> getNotaActividadProfesor(String ArrayListNotaActividad) throws JSONException {
        if (ArrayListNotaActividad != null) {
            JSONArray jsonArray = new JSONArray(ArrayListNotaActividad);
            Log.v("areaArray", "Json String" + jsonArray);
            ArrayList<NotaActividadProfesor> notaActividadProfesors = new ArrayList<>();
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String idEstudiante = jsonObject.getString("id_estudiante");
                String notaActividad = jsonObject.getString("nota_actividad");
                NotaActividadProfesor notaActividadProfesor = new NotaActividadProfesor();
                notaActividadProfesor.setIdEstudiante(idEstudiante);
                notaActividadProfesor.setNotaActividad(notaActividad);
                notaActividadProfesors.add(notaActividadProfesor);
            }
            return notaActividadProfesors;
        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<NotaActividadProfesor> notaActividadProfesors) {

    }
}
