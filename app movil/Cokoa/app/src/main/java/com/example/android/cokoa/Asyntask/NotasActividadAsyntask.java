package com.example.android.cokoa.Asyntask;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

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
public class NotasActividadAsyntask extends AsyncTask<String,Void,ArrayList<NotaActividad>>{
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private ImageView imageView;
    private TextView textView;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = NotasActividadAsyntask.class.getSimpleName();



    public NotasActividadAsyntask(Activity activity){
        super();
        this.activity=activity;
    }

    @Override
    protected ArrayList<NotaActividad> doInBackground(String... params) {

        if(ActividadLogro()!=null){
            ArrayList<NotaActividad> actividadLogro = ActividadLogro();
            if(notasActividadLogro()!=null){
                ArrayList<NotaActividad> notaActividads = notasActividadLogro();

                for(int i=0;i<actividadLogro.size();i++){
                    String id_actividad=actividadLogro.get(i).getIdnotaActividad();
                    for (int j =0;j<notaActividads.size();j++){
                        String id_nota_actividad = notaActividads.get(j).getIdnotaActividad();
                        if(id_actividad.equals(id_nota_actividad)){
                            actividadLogro.get(i).setNotaActividad(notaActividads.get(j).getNotaActividad());
                        }else {
                            actividadLogro.get(i).setNotaActividad("---");
                        }
                    }

                }
                //actividadLogro.get(0).setNotaActividad("5.5");
                return actividadLogro;
            }else {
                for(int i=0;i<actividadLogro.size();i++){
                    actividadLogro.get(i).setNotaActividad("---");
                }
                return actividadLogro;
            }
        }



        return null;

    }

    public ArrayList<NotaActividad> ActividadLogro(){
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
            //http://localhost:3000/estudiantes/materias/notalogro/1-200
            URL url = new URL(serverUrls + "estudiantes/logros/44216/actividades");
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
            // Si el código no consiguió con éxito los datos de la actividad,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 400) {
                    ArrayList a = new ArrayList();
                    a.add(0,"400");
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
            ArrayList<String> status = new  ArrayList(result);
            if(status.get(0)=="400"){
                Toast toast1 =
                        Toast.makeText(activity, "status 400 sql vacio", Toast.LENGTH_SHORT);
                toast1.show();


            }else {
                mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view_actividad_logro);
               /* imageView.setVisibility(View.GONE);
                textView.setVisibility(View.GONE);
                mRecyclerView.setVisibility(View.VISIBLE);*/
                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new NotasActividadAdapters(result, activity);
                mRecyclerView.setAdapter(mAdapter);

            }


        } else {
            Snackbar.make(activity.findViewById(android.R.id.content), "No tienes conexión", Snackbar.LENGTH_LONG)
                    .setAction("VOLVER A INTENTARLO", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                           /* NotasActividadAsyntask notasActividadAsyntask = new NotasActividadAsyntask(activity);
                            notasActividadAsyntask.execute();*/
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
                 String id_actividad = notaActividad.getString("id_actividad");
                 String descActividad = notaActividad.getString("descripcion_actividad");
                // String notaActividads = notaActividad.getString("nota_actividad");
                 NotaActividad  notaActividad1 = new NotaActividad();
                notaActividad1.setIdnotaActividad(id_actividad);
                 notaActividad1.setDescActividad(descActividad);
                 //notaActividad1.setNotaActividad(notaActividads);
                 notasActividadArrayList.add(notaActividad1);

             }

             return notasActividadArrayList;
         }
         return null;
     }


    public  ArrayList<NotaActividad> notasActividadLogro(){
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
            //http://localhost:3000/estudiantes/materias/notalogro/1-200
            URL url = new URL(serverUrls + "estudiantes/logro/44216/notas/actividad/");
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
            // Si el código no consiguió con éxito los datos de la actividad,
            int statuss = 0;
            try {
                statuss = urlConnection.getResponseCode();
                Log.v("status", "Json String" + statuss);
                if (statuss == 400) {
                    ArrayList a = new ArrayList();
                    a.add(0,"400");
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
            return getNotasActividadLogros(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
        }
    public ArrayList<NotaActividad> getNotasActividadLogros(String notaActividadJson)throws JSONException {

        if(notaActividadJson!=null){
            ArrayList<NotaActividad> notaActividadArraylist = new ArrayList<>();
            JSONArray jsonArrayNotaActividad = new JSONArray(notaActividadJson);
            for(int i=0;i<jsonArrayNotaActividad.length();i++){
                JSONObject jsonObject = jsonArrayNotaActividad.getJSONObject(i);
                String id_actividad = jsonObject.getString("id_actividad");
                String nota_actividad = jsonObject.getString("nota_actividad");
                NotaActividad notaActividad = new NotaActividad();
                notaActividad.setIdnotaActividad(id_actividad);
                notaActividad.setNotaActividad(nota_actividad);
                notaActividadArraylist.add(notaActividad);

            }
            Log.v("id_actividad", "notaActividadArraylist :" + notaActividadArraylist);
            return notaActividadArraylist;


        }
        return null;
    }

}
