package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.os.AsyncTask;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.example.android.cokoas.AdaptersProfesor.EstudianteCursoAdapters;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.ModelsProfesor.NotaActividadProfesor;
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
 * Created by juancarlospantoja@hotmail.com on 14/10/2016.
 */
public class EstudianteNotaActividadProfesorAsyntask extends AsyncTask<String, Void, ArrayList<EstudianteCurso>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = EstudianteNotaActividadProfesorAsyntask.class.getSimpleName();
    private Activity activity;

    public EstudianteNotaActividadProfesorAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    protected ArrayList<EstudianteCurso> doInBackground(String... params) {
        if(estudianteCursos(params[1])!=null){
            ArrayList<EstudianteCurso> estudianteCursos = estudianteCursos(params[1]);
            if(notaActividadProfesors(params[2])!=null){
                ArrayList<NotaActividadProfesor> notaActividadProfesors = notaActividadProfesors(params[2]);
                for(int i=0;i<estudianteCursos.size();i++){
                    estudianteCursos.get(i).setIdActividad(params[0]);
                    String idEstudiante = estudianteCursos.get(i).getCodigoEstudiante();
                    for(int j=0;j<notaActividadProfesors.size();j++){
                        String idEstudiante_nota_actividad = notaActividadProfesors.get(j).getIdEstudiante();

                       // estudianteCursos.get(i).setIdActividad(notaActividadProfesors.get(j).getIdActividad());
                        if(idEstudiante.equals(idEstudiante_nota_actividad)){
                            if(params[0].equals(notaActividadProfesors.get(j).getIdActividad())){
                                estudianteCursos.get(i).setNotaEstudiante(notaActividadProfesors.get(j).getNotaActividad());
                            }


                            //i++;
                        }else {
                            //estudianteCursos.get(i).setNotaEstudiante(" - ");
                        }
                    }

                }
                return estudianteCursos;
            }else{
                return estudianteCursos;
            }
        }

       return null;
    }

    public ArrayList<EstudianteCurso> estudianteCursos(String params){
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
            URL url = new URL(serverUrls + "api/cursos/"+params+"/estudiantes");
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
            return getEstudianteCursoProfesor(forecastJsonStr,params);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }
        return null;
    }
    public ArrayList<EstudianteCurso> getEstudianteCursoProfesor(String ArrayListEstudianteCurso,String params) throws JSONException {
        if (ArrayListEstudianteCurso != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación
            Log.v("getArea", "Json String" + ArrayListEstudianteCurso);
            JSONArray areaArray = new JSONArray(ArrayListEstudianteCurso);
            Log.v("areaArray", "Json String" + areaArray);
            ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<EstudianteCurso>();

            int numeroLista = 0;

            for (int i = 0; i < areaArray.length(); i++) {
                JSONObject areas = areaArray.getJSONObject(i);
                String nombres = "";



                if (!areas.isNull("apellido1")) {
                    nombres = areas.getString("apellido1");
                }

                if (!areas.isNull("apellido2")) {
                    nombres = nombres +" "+ areas.getString("apellido2");
                }

                if (!areas.isNull("nombre1")) {
                    nombres = nombres +" "+ areas.getString("nombre1");
                }

                if (!areas.isNull("nombre2")) {
                    nombres = nombres +" "+ areas.getString("nombre2");
                }

                EstudianteCurso estudianteCurso = new EstudianteCurso();

                numeroLista=i;
                estudianteCurso.setNumeroLista(Integer.toString(numeroLista+1));






                estudianteCurso.setNombreEstudiante(nombres);

                String codigo = areas.getString("id_estudiante");
                estudianteCurso.setCodigoEstudiante(codigo);

               // estudianteCurso.setIdActividad(params);

                estudianteCursos.add(estudianteCurso);


            }

            return estudianteCursos;

        }
        return null;
    }


    public ArrayList<NotaActividadProfesor> notaActividadProfesors(String idCargaDocente){
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
            URL url = new URL(serverUrls + "api/docentes/cargas/"+idCargaDocente+"/logros/actividades/notas");
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
               String idActividad = jsonObject.getString("id_actividad");
                String idEstudiante = jsonObject.getString("id_estudiante");
                String notaActividad = jsonObject.getString("nota_actividad");
                NotaActividadProfesor notaActividadProfesor = new NotaActividadProfesor();
                notaActividadProfesor.setIdActividad(idActividad);
                notaActividadProfesor.setIdEstudiante(idEstudiante);
                notaActividadProfesor.setNotaActividad(notaActividad);
                notaActividadProfesors.add(notaActividadProfesor);
            }
            return notaActividadProfesors;
        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<EstudianteCurso> estudianteCursos) {
        super.onPostExecute(estudianteCursos);
        if(estudianteCursos!=null){
             mRecyclerView = (RecyclerView) activity.findViewById(R.id.recycler_estudiantes_actividad_logro_materia_profesor);
                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new EstudianteCursoAdapters(estudianteCursos, activity);
                mRecyclerView.setAdapter(mAdapter);
        }
    }
}
