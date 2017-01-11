package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.os.AsyncTask;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.example.android.cokoas.AdaptersProfesor.CusosProfesorAdapters;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.CursosProfesor;
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
 * Created by juancarlospantoja@hotmail.com on 12/07/2016.
 */
public class CursosAsyntaskProfresor extends AsyncTask<Void, Void, ArrayList<CursosProfesor>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = CursosAsyntaskProfresor.class.getSimpleName();

    private Activity activity;


    public CursosAsyntaskProfresor(Activity activity) {
        super();
        this.activity = activity;
    }



    @Override
    protected ArrayList<CursosProfesor> doInBackground(Void... params) {
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
            URL url = new URL(serverUrls + "api/docentes/cargas");
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

            Log.v("revisar json ", "Json Stringssss" + forecastJsonStr);

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
            return getCursosMateriaProfesor(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;

    }

    @Override
    protected void onPostExecute(ArrayList<CursosProfesor> cursosProfesors) {
        if(cursosProfesors!=null){
            ArrayList arrayList = new ArrayList();
            arrayList = cursosProfesors;
            Log.v("revisar json ", "Revisar erro" + cursosProfesors);
            Log.v("revisar json ", "Revisar error" + arrayList.size());

             mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view);
//                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new CusosProfesorAdapters(cursosProfesors, activity);
                mRecyclerView.setAdapter(mAdapter);
        }
    }

    public ArrayList<CursosProfesor> getCursosMateriaProfesor(String ArrayListCursoProfesores) throws JSONException {

        if (ArrayListCursoProfesores != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación
            Log.v("getArea", "Json String" + ArrayListCursoProfesores);
            JSONArray areaArray = new JSONArray(ArrayListCursoProfesores);
            Log.v("areaArray", "Json String" + areaArray);
            ArrayList<CursosProfesor> cursosProfesors = new ArrayList<CursosProfesor>();

            for (int i = 0; i < areaArray.length(); i++) {
                JSONObject areas = areaArray.getJSONObject(i);



                CursosProfesor cursosProfesor = new CursosProfesor();

                String id_curso = areas.getString("id_curso");
                cursosProfesor.setId_Curso(id_curso);

                String id_carga_docente = areas.getString("id_carga_docente");
                cursosProfesor.setIdCargaDocente(id_carga_docente);

                String nombre_materia = areas.getString("nombre_materia");
                cursosProfesor.setNombreMateria(nombre_materia);

                String grado_materia = areas.getString("grado");
                cursosProfesor.setGrado(grado_materia);

                String curso_materia = areas.getString("grupo");
                cursosProfesor.setCurso(curso_materia);

                cursosProfesors.add(cursosProfesor);


            }

            return cursosProfesors;


        }

        return null;

    }

}
