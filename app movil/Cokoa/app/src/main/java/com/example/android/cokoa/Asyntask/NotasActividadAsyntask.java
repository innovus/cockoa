package com.example.android.cokoa.Asyntask;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.example.android.cokoa.Adapters.NotasActividadAdapters;
import com.example.android.cokoa.AppConstants.AppConstants;
import com.example.android.cokoa.Models.NotaActividad;
import com.example.android.cokoa.R;
import com.example.android.cokoa.SessionManager.SessionManager;

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
 * Created by ASUS on 10/06/2016.
 */
public class NotasActividadAsyntask extends AsyncTask<Void,Void,ArrayList<NotaActividad>>{
    //extends AsyncTask<Void, Void, ArrayList<Logro>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = NotasActividadAsyntask.class.getSimpleName();



    public NotasActividadAsyntask(Activity activity){
        super();
        this.activity=activity;
    }

    @Override
    protected ArrayList<NotaActividad> doInBackground(Void... params) {
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
            URL url = new URL(serverUrls + "estudiantes/materias/logros/notas");
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
            return getNotasActividad(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<NotaActividad> result) {
        if (result != null) {
            mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view_logro);
            mRecyclerView.setHasFixedSize(true);
            //usR UN ADMINISTRADOR PARA LINEARLAYOUT
            mLayoutManager = new LinearLayoutManager(activity);
            mRecyclerView.setLayoutManager(mLayoutManager);
            mAdapter = new NotasActividadAdapters(result, activity);
            mRecyclerView.setAdapter(mAdapter);
        } else {
            Snackbar.make(activity.findViewById(android.R.id.content), "No tienes conexión", Snackbar.LENGTH_LONG)
                    .setAction("VOLVER A INTENTARLO", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            NotasActividadAsyntask notasActividadAsyntask = new NotasActividadAsyntask(activity);
                            notasActividadAsyntask.execute();
                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }
    }

    public static ArrayList<NotaActividad> getNotasActividad(String logroJsonStr) throws JSONException {
         if (logroJsonStr != null) {
             // Ahora tenemos una cadena que representa todas las areas en formato JSON .
             // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
             // En una jerarquía de objetos para nosotros .
             // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
             // La información de ubicación
             Log.v("getNotaslogro", "Json String" + logroJsonStr);
             JSONArray notasActividadArray = new JSONArray(logroJsonStr);
             Log.v("areaArray", "Json String" + notasActividadArray);
             ArrayList<NotaActividad> notasActividadArrayList = new ArrayList<NotaActividad>();


             for (int i = 0; i < notasActividadArray.length(); i++) {
                 JSONObject notaActividad = notasActividadArray.getJSONObject(i);
                 String titleActividad = notaActividad.getString("nombre_logro");
                 String descActividad = notaActividad.getString("descripcion_logro");
                 String notaActividads = notaActividad.getString("nota_logro");
                 NotaActividad  notaActividad1 = new NotaActividad();
                 notaActividad1.setNombreActividad(titleActividad);
                 notaActividad1.setDescActividad(descActividad);
                 notaActividad1.setNotaActividad(notaActividads);
                 notasActividadArrayList.add(notaActividad1);

             }

             return notasActividadArrayList;
         }
         return null;
     }
}
