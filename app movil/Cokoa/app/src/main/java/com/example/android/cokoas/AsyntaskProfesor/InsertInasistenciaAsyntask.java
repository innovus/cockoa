package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.Gravity;
import android.view.View;

import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.SessionManager.SessionManager;

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
 * Created by juancarlospantoja@hotmail.com on 17/08/2016.
 */
public class InsertInasistenciaAsyntask extends AsyncTask<ArrayList<EstudianteCurso>, Void, String> {
    SessionManager sessionManager;
    private Activity activity;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = InsertInasistenciaAsyntask.class.getSimpleName();
    ProgressDialog progressDialog;

    public InsertInasistenciaAsyntask(Activity activity) {
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
        progressDialog.setCancelable(true);
        progressDialog.getWindow().setGravity(Gravity.CENTER);
        progressDialog.show();
    }

    @Override
    protected String doInBackground(ArrayList<EstudianteCurso>... params) {
        ArrayList<EstudianteCurso> estudianteCursos = params[0];
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < estudianteCursos.size(); i++) {
            EstudianteCurso estudianteCurso = estudianteCursos.get(i);
            if (estudianteCurso.isInasistencia() == true) {
                JSONObject jsonObject = new JSONObject();
                try {

                    jsonObject.put("id_estudiante", Integer.parseInt(estudianteCurso.getCodigoEstudiante()));
                    jsonObject.put("estado_inasistencia", 1);
                    jsonObject.put("fecha_inasistencia", estudianteCurso.getFecha());
                    jsonObject.put("id_carga", estudianteCurso.getIdCargaDocente());
                    jsonArray.put(jsonObject);

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
            URL url = new URL(serverUrls + "inasistencias/inasistencia");

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
        }
        try {
            return mensajeInasistencia(forecastJsonStr);
        } catch (Exception e) {

        }


        return null;
    }

    public String mensajeInasistencia(String mensajeJson) throws JSONException{
        if(mensajeJson!=null){
            String s = "";
            JSONObject jsonObject = new JSONObject(mensajeJson);
            s = jsonObject.getString("mensaje");
            Log.v("revisar json ", "MEnxaje" + s);
            return s;
        }
        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        if(s!=null){


            if(s.equals("Inasistencias insertada")){
                Snackbar.make(activity.findViewById(android.R.id.content), "Se ingreso correctamente la insasistencia", Snackbar.LENGTH_LONG)
                        .setAction("", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                            }
                        })
                        .setActionTextColor(Color.YELLOW)
                        .show();
                progressDialog.dismiss();
            }else{
                Snackbar.make(activity.findViewById(android.R.id.content), "NO se ingreso la inasistencia", Snackbar.LENGTH_LONG)
                        .setAction("", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                            }
                        })
                        .setActionTextColor(Color.YELLOW)
                        .show();
                progressDialog.dismiss();

            }
        }else {
            Snackbar.make(activity.findViewById(android.R.id.content), "NO se ingreso la inasistencia", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
            progressDialog.dismiss();
        }
        progressDialog.dismiss();

    }


}
