package com.example.android.cokoas.AsyntaskProfesor;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.widget.ExpandableListView;

import com.example.android.cokoas.AdaptersProfesor.LlamarListaExpandableListViewAdapter;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.ModelsProfesor.CursoProfesor;
import com.example.android.cokoas.ModelsProfesor.CursosProfesor;
import com.example.android.cokoas.ModelsProfesor.MateriaProfesor;
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
 * Created by ASUS on 14/08/2016.
 */
public class LlamarListaAsyntask extends AsyncTask<Void, Void, ArrayList<CursosProfesor>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    ProgressDialog progressDialog;
    private ExpandableListView expandableListView;
    private LlamarListaExpandableListViewAdapter llamarListaExpandableListViewAdapter;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = LlamarListaAsyntask.class.getSimpleName();
    private Activity activity;

    public LlamarListaAsyntask(Activity activity) {
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
        progressDialog.setCancelable(false);
        progressDialog.getWindow().setGravity(Gravity.CENTER);
        progressDialog.show();
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
        if (cursosProfesors != null) {
           /* mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view);
            mRecyclerView.setHasFixedSize(true);
            //usR UN ADMINISTRADOR PARA LINEARLAYOUT
            mLayoutManager = new LinearLayoutManager(activity);
            mRecyclerView.setLayoutManager(mLayoutManager);
            mAdapter = new LlamarListaAdapters(cursosProfesors, activity);
            mRecyclerView.setAdapter(mAdapter);*/
            expandableListView = (ExpandableListView) activity.findViewById(R.id.expandableListView2);
            MateriaGroup(cursosProfesors);
            progressDialog.dismiss();

        }
        progressDialog.dismiss();
    }

    private void MateriaGroup(ArrayList<CursosProfesor> cursosProfesorss){


        ArrayList<MateriaProfesor> materiaProfesors = new ArrayList<MateriaProfesor>();
        ArrayList<CursoProfesor> cursoProfesors;
        String nombreMAteria = " ";
        for (int i = 0;i<cursosProfesorss.size();i++){
            MateriaProfesor materiaProfesor = new MateriaProfesor();

            if(!cursosProfesorss.get(i).getNombreMateria().equals(nombreMAteria)){
                nombreMAteria=cursosProfesorss.get(i).getNombreMateria();
                materiaProfesor.setNombreMateria(cursosProfesorss.get(i).getNombreMateria());
                cursoProfesors = new ArrayList<CursoProfesor>();

                for (int i1 = 0;i1<cursosProfesorss.size();i1++){
                    if(nombreMAteria.equals(cursosProfesorss.get(i1).getNombreMateria())){
                        CursoProfesor cursoProfesor = new CursoProfesor();
                        cursoProfesor.setIdCcurso(cursosProfesorss.get(i1).getId_Curso());
                        cursoProfesor.setIdCargaProfesor(cursosProfesorss.get(i1).getIdCargaDocente());
                        cursoProfesor.setGrado(cursosProfesorss.get(i1).getGrado());
                        cursoProfesor.setCurso(cursosProfesorss.get(i1).getCurso());
                        cursoProfesors.add(cursoProfesor);
                    }

                }
                materiaProfesor.setCursoProfesors(cursoProfesors);
                materiaProfesors.add(materiaProfesor);

            }

        }
        llamarListaExpandableListViewAdapter = new LlamarListaExpandableListViewAdapter(activity,materiaProfesors);
        expandableListView.setAdapter(llamarListaExpandableListViewAdapter);
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

                String id_carga_docente = areas.getString("id_carga_docente");
                cursosProfesor.setIdCargaDocente(id_carga_docente);

                String id_curso = areas.getString("id_curso");
                cursosProfesor.setId_Curso(id_curso);

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
