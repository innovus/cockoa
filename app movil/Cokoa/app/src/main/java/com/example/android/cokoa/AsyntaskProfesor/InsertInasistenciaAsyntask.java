package com.example.android.cokoa.AsyntaskProfesor;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

import com.example.android.cokoa.AppConstants.AppConstants;
import com.example.android.cokoa.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoa.SessionManager.SessionManager;

import org.json.JSONArray;
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
 * Created by ASUS on 17/08/2016.
 */
public class InsertInasistenciaAsyntask extends AsyncTask<ArrayList<EstudianteCurso>, Void, Void> {
    SessionManager sessionManager;
    private Activity activity;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = InsertInasistenciaAsyntask.class.getSimpleName();
    public InsertInasistenciaAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }
    @Override
    protected Void doInBackground(ArrayList<EstudianteCurso>... params) {
        ArrayList<EstudianteCurso> estudianteCursos = params[0];
        JSONArray jsonArray = new JSONArray();
        for (int i=0;i<estudianteCursos.size();i++){
            EstudianteCurso estudianteCurso = estudianteCursos.get(i);
            if(estudianteCurso.isInasistencia()==true){
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("id_periodo",1);
                    jsonObject.put("id_estudiante", Integer.parseInt(estudianteCurso.getCodigoEstudiante()));
                    jsonObject.put("estado_inasistencia",2);
                    jsonObject.put("fecha_inasistencia",estudianteCurso.getFecha());
                    jsonObject.put("id_carga",2);
                    jsonArray.put(jsonObject);
                    //{"id_periodo": 1, "id_estudiante":1 ,"estado_inasistencia":1,"fecha_inasistencia": "02/02/2016","id_carga": 1}

                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }

        }

        Log.v("status", "J" + jsonArray);
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
            URL url = new URL(serverUrls + "cursos/inasistencia");

            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");

            String token = sessionManager.getKeyToken();
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonArray.toString());
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

            Log.v("revisar json ", "Andrea" + forecastJsonStr);

        } catch (IOException e) {
            Log.e(LOG_TAG, "Error ", e);
            // Si el código no consiguió con éxito los datos del area,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 400) {
                    return null;//Integer.toString(statuss);

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
        } try {
            return null;
        }catch (Exception e){

        }



        return null;
    }
}
