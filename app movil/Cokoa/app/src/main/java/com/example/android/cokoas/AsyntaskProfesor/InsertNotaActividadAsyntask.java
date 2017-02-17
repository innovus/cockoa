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
 * Created by ASUS on 10/08/2016.
 */
public class InsertNotaActividadAsyntask extends AsyncTask<ArrayList<EstudianteCurso>, Void, String> {
    SessionManager sessionManager;
    private Activity activity;
    ProgressDialog progressDialog;
    private final String idActivida,idCurso,cargaDocente;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = InsertNotaActividadAsyntask.class.getSimpleName();

    public InsertNotaActividadAsyntask(Activity activity,String idActivida,String idCurso,String cargaDocente) {
        super();
        this.activity = activity;
        this.idActivida=idActivida;
        this.idCurso=idCurso;
        this.cargaDocente=cargaDocente;
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
    protected String doInBackground(ArrayList<EstudianteCurso>... params) {
        ArrayList<EstudianteCurso> estudianteCursos = params[0];


        sessionManager = new SessionManager(activity.getApplication());
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un Araylist
        String forecastJsonStr = null;

        try {
            /*for (int i = 0; i < estudianteCursos.size(); i++) {
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

        }*/


            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < estudianteCursos.size(); i++) {
                EstudianteCurso estudianteCurso = estudianteCursos.get(i);
                if (estudianteCurso.isNotaActividad() == true) {
                    JSONObject jsonParam = new JSONObject();
                    jsonParam.put("id_actividad", estudianteCurso.getIdActividad());
                    jsonParam.put("nota_actividad", estudianteCurso.getNotaEstudiante());
                    jsonParam.put("id_estudiante", estudianteCurso.getCodigoEstudiante());
                    jsonArray.put(jsonParam);
                }
            }

            Log.v("Arrait", "arregloNOtas" + jsonArray);

           /* jsonParam.put("id_actividad", params[0]);
            jsonParam.put("nota_actividad", params[1]);//id_estudiante
            jsonParam.put("id_estudiante", params[2]);
            jsonArray.put(jsonParam);*/

            // Construir la dirección URL para el appi materias
            // Posibles parámetros están disponibles en la página de la API de materias del liceo.
            URL url = new URL(serverUrls + "api/docentes/actividades/notas");
            Log.v("revisar json ", "postman" + params[0]);
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");

            String token = sessionManager.getKeyToken();
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonArray.toString());
            Log.v("revisar json ", "post" + jsonArray);
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

            Log.v("a ver ", "post" + forecastJsonStr);

        } catch (IOException e) {
            Log.e(LOG_TAG, "Error ", e);
            // Si el código no consiguió con éxito los datos del area,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 400) {
                    return Integer.toString(statuss);

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
        try {
            /*int statuss = 0;
            statuss = urlConnection.getResponseCode();
            return Integer.toString(statuss);*/
            return getStatuss(forecastJsonStr);
        } catch (Exception e) {

        }


        return null;
    }

    public static String getStatuss(String statussJson) throws JSONException {
        if (statussJson != null) {

            String s = "1";
            JSONObject jsonObject = new JSONObject(statussJson);
            s = jsonObject.getString("status");
            return s;
        }
        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        if (s != null) {
            if (s.equals("0")) {
                progressDialog.dismiss();
                Snackbar.make(activity.findViewById(android.R.id.content), "Se ingreso correctamente la calificación", Snackbar.LENGTH_LONG)
                        .setAction("", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                            }
                        })
                        .setActionTextColor(Color.YELLOW)
                        .show();

                new EstudianteNotaActividadProfesorAsyntask(activity).execute(idActivida,idCurso,cargaDocente);
            } else {
                progressDialog.dismiss();
                Snackbar.make(activity.findViewById(android.R.id.content), "No se ingreso la calificación", Snackbar.LENGTH_LONG)
                        .setAction("", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                            }
                        })
                        .setActionTextColor(Color.YELLOW)
                        .show();
            }
        } else {
            progressDialog.dismiss();
            Snackbar.make(activity.findViewById(android.R.id.content), "No se ingreso la calificación", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }
        progressDialog.dismiss();

    }
}
