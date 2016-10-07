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

import com.example.android.cokoa.Adapters.LogrosAdapters;
import com.example.android.cokoa.AppConstants.AppConstants;
import com.example.android.cokoa.Models.Logro;
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
 * Created by ASUS on 27/06/2016.
 */
public class LogrosPeriodoAsyntask extends AsyncTask<String, Void, ArrayList<Logro>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private ImageView imageView;
    private TextView textView;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = LogrosPeriodoAsyntask.class.getSimpleName();

    /*public LogrosAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }*/

    public  LogrosPeriodoAsyntask(Activity activity){
        super();
        this.activity = activity;
    }


    @Override
    protected ArrayList<Logro> doInBackground(String... params) {
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
            //estudiantes/materias/notalogro/"+params[0]+"-"+params[1]
            //estudiantes/materias/logro/periodo/
            URL url = new URL(serverUrls + "estudiantes/materias/logro/periodo/"+params[0]+"-"+params[1]);
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

            Log.v("notaLogros", "Json String" + forecastJsonStr);

        } catch (IOException e) {
            Log.e(LOG_TAG, "Error ", e);
            // Si el código no consiguió con éxito los datos del logro,
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
            return getLogros(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }



    @Override
    protected void onPostExecute(ArrayList<Logro> result) {
        if (result != null) {

            ArrayList<String> status = new  ArrayList(result);
            if(status.get(0)=="400"){
                Toast toast1 =
                        Toast.makeText(activity, "status 400 sql vacio", Toast.LENGTH_SHORT);
                toast1.show();

            }else {
                mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view_logro);

                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new LogrosAdapters(result, activity);
                mRecyclerView.setAdapter(mAdapter);
            }

        } else {
            Snackbar.make(activity.findViewById(android.R.id.content), "No tienes conexión", Snackbar.LENGTH_LONG)
                    .setAction("VOLVER A INTENTARLO", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }
    }

    public static ArrayList<Logro> getLogros(String logroJsonStr) throws JSONException {

        if (logroJsonStr != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación
            Log.v("getArea", "Json String" + logroJsonStr);
            JSONArray logroArray = new JSONArray(logroJsonStr);
            Log.v("areaArray", "Json String" + logroArray);
            ArrayList<Logro> logroArrayList = new ArrayList<Logro>();


            for (int i = 0; i < logroArray.length(); i++) {
                JSONObject logro = logroArray.getJSONObject(i);
                String numero_periodo =  logro.getString("numero_periodo");
                String id_materia = logro.getString("id_materia");
                String id_logro = logro.getString("id_logro");
               // String titleLogro = logro.getString("nombre_logro");
                String descLogro = logro.getString("descripcion_logro");
                Logro logro1 = new Logro();
                logro1.setId_materia(id_materia);
                logro1.setId_logro(id_logro);
                //logro1.setTitulo_logro(titleLogro);
                logro1.setDesc_logro(descLogro);
                logro1.setNumero_periodo(numero_periodo);
                logroArrayList.add(logro1);

            }

            return logroArrayList;
        }
        return null;
    }


}

