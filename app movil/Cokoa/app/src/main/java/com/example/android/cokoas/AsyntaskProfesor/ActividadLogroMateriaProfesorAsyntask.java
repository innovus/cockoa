package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.example.android.cokoas.AdaptersProfesor.ActividadLogroMateriaProfesorAdapter;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.ActividadLogroProfesor;
import com.example.android.cokoas.R;
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
 * Created by ASUS on 14/10/2016.
 */
public class ActividadLogroMateriaProfesorAsyntask extends AsyncTask<String, Void, ArrayList<ActividadLogroProfesor>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = ActividadLogroMateriaProfesorAsyntask.class.getSimpleName();
    private Activity activity;

    public ActividadLogroMateriaProfesorAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    protected ArrayList<ActividadLogroProfesor> doInBackground(String... params) {
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
            URL url = new URL(serverUrls + "api/docentes/logros/"+params[0]+"/actividades");
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
            return getActividadLogroProfesor(forecastJsonStr,params[1],params[2]);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<ActividadLogroProfesor> getActividadLogroProfesor(String ArrayListLogroProfesor,String idCurso,String idCargaDocente) throws JSONException {
        if (ArrayListLogroProfesor != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación
            JSONArray jsonArray = new JSONArray(ArrayListLogroProfesor);
            ArrayList<ActividadLogroProfesor> logroProfesors = new ArrayList<ActividadLogroProfesor>();

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                ActividadLogroProfesor logroProfesor = new ActividadLogroProfesor();
                String idActividad = jsonObject.getString("id_actividad");
                String nombreActividad = jsonObject.getString("descripcion_actividad");
                String porcentaje = jsonObject.getString("porcentaje_actividad");
                logroProfesor.setIdActividad(idActividad);
                logroProfesor.setNombreActividad(nombreActividad);
                logroProfesor.setPorcentajeActividad(porcentaje);
                logroProfesor.setCasilla(false);

                logroProfesor.setIdCurso(idCurso);
                logroProfesor.setIdCargaDocente(idCargaDocente);
                logroProfesors.add(logroProfesor);
            }
            return logroProfesors;

        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<ActividadLogroProfesor> actividadLogroProfesors) {
        super.onPostExecute(actividadLogroProfesors);
        if(actividadLogroProfesors!=null){

            Log.v("tokenSessionManager", "cantidad de actividades" + actividadLogroProfesors.size());

            if(actividadLogroProfesors.size()>0){
                mRecyclerView = (RecyclerView) activity.findViewById(R.id.recycler_actividad_logro_materia_profesor);
                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);//LogroMateriaProfesorAdapter
                mAdapter = new ActividadLogroMateriaProfesorAdapter(actividadLogroProfesors, activity);
                mRecyclerView.setAdapter(mAdapter);
            }else{
                Snackbar.make(activity.findViewById(android.R.id.content), "Aun no asigna actividades a este logro", Snackbar.LENGTH_LONG)
                        .setAction("", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {

                            }
                        })
                        .setActionTextColor(Color.YELLOW)
                        .show();
            }


        }else{
            Snackbar.make(activity.findViewById(android.R.id.content), "Aun no asignas actividades a este logro", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }
    }
}
