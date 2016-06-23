package com.example.android.cokoa.Asyntask;

import android.app.Activity;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.example.android.cokoa.Adapters.MateriaAdapters;
import com.example.android.cokoa.AppConstants.AppConstants;
import com.example.android.cokoa.Models.Materia;
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
 * Created by ASUS on 08/06/2016.
 */
public class MateriaAsyntask extends AsyncTask<Void, Void, ArrayList<Materia>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;

    private Activity activity;
    private final String LOG_TAG = MateriaAsyntask.class.getSimpleName();

    public MateriaAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    protected ArrayList<Materia> doInBackground(Void... params) {
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
            URL url = new URL(serverUrls + "estudiantes/materias/");
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
            return getAreas(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<Materia> result) {
        if (result != null) {
            mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view);
            mRecyclerView.setHasFixedSize(true);
            //usR UN ADMINISTRADOR PARA LINEARLAYOUT
            mLayoutManager = new LinearLayoutManager(activity);
            mRecyclerView.setLayoutManager(mLayoutManager);
            mAdapter = new MateriaAdapters(result, activity);
            mRecyclerView.setAdapter(mAdapter);
        } else {
            Snackbar.make(activity.findViewById(android.R.id.content), "No tienes conexión", Snackbar.LENGTH_LONG)
                    .setAction("VOLVER A INTENTARLO", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            MateriaAsyntask areaAsyntask = new MateriaAsyntask(activity);
                            areaAsyntask.execute();
                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }
    }


    public static ArrayList<Materia> getAreas(String areaJsonStr) throws JSONException {

        if (areaJsonStr != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación
            Log.v("getArea", "Json String" + areaJsonStr);
            JSONArray areaArray = new JSONArray(areaJsonStr);
            Log.v("areaArray", "Json String" + areaArray);
            ArrayList<Materia> areaArrayList = new ArrayList<Materia>();

            for (int i = 0; i < areaArray.length(); i++) {
                JSONObject areas = areaArray.getJSONObject(i);
                String nombre1_docente = "";
                String nombre2_docente = "";
                String apellido1_docente = "";
                String apellido2_docente = "";


                if (areas.isNull("nombre1")) {
                    nombre1_docente = "";
                } else {
                    nombre1_docente = areas.getString("nombre1");
                }

                if (areas.isNull("nombre2")) {
                    nombre2_docente = "";
                } else {
                    nombre2_docente = (" " + areas.getString("nombre2"));
                }

                if (areas.isNull("apellido1")) {
                    apellido1_docente = "";
                } else {
                    apellido1_docente = (" " + areas.getString("apellido1"));
                }

                if (areas.isNull("apellido2")) {
                    apellido2_docente = "";
                } else {
                    apellido2_docente = (" " + areas.getString("apellido2"));
                }

                String id_materia = areas.getString("id_materia");
                String title = areas.getString("nombre_materia");
                Materia materia = new Materia();
                materia.setId_materia(id_materia);
                materia.setNombre1_docente(nombre1_docente);
                materia.setNombre2_docente(nombre2_docente);
                materia.setApellido1_docente(apellido1_docente);
                materia.setApellido2_docente(apellido2_docente);
                materia.setNombre_materia(title);
                areaArrayList.add(materia);

            }

            return areaArrayList;
        }
        return null;
    }


}
