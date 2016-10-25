package com.example.android.cokoa.AsyntaskProfesor;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.example.android.cokoa.AppConstants.AppConstants;
import com.example.android.cokoa.ModelsProfesor.ActividadLogroProfesor;
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
import java.util.List;

/**
 * Created by ASUS on 27/07/2016.
 */
public class SpinnerActividadAsyntask extends AsyncTask<Void, Void,ArrayList<ActividadLogroProfesor>>{
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private final String LOG_TAG = SpinnerActividadAsyntask.class.getSimpleName();
    private Spinner spinner2;

    private Activity activity;


    public SpinnerActividadAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }



    @Override
    protected ArrayList<ActividadLogroProfesor> doInBackground(Void... params) {
        ArrayList<ActividadLogroProfesor> actividadLogroProfesors =  getLogrosProfesordoInBackground();
        return actividadLogroProfesors;
    }

    public ArrayList<ActividadLogroProfesor> getLogrosProfesordoInBackground()  {
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
            URL url = new URL(serverUrls + "api/docentes/logros/44216/actividades");
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
            return getActividadLogroProfesor(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }
        return null;
    }

    public ArrayList<ActividadLogroProfesor> getActividadLogroProfesor(String ArrayListLogroProfesor) throws JSONException {
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
                String nombreActividad = jsonObject.getString("descripcion_actividad");
                logroProfesor.setNombreActividad(nombreActividad);

                logroProfesors.add(logroProfesor);
            }
            return logroProfesors;

        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<ActividadLogroProfesor> actividadLogroProfesors) {
        if (actividadLogroProfesors!=null){
            List<String> lista = new ArrayList<String>();
            lista.add("elija una Actividad ");
            lista.add("Actividad 1");
                       for(int i=0;i<actividadLogroProfesors.size();i++){
                            lista.add(actividadLogroProfesors.get(i).getNombreActividad());
                        }



            spinner2 = (Spinner) activity.findViewById(R.id.spinner3);
            spinner2.setVisibility(View.VISIBLE);
            String[] opcione = {"Actividad 1", "Actividad 2", "Actividad 3"};
            ArrayAdapter<String> adapters = new ArrayAdapter<String>(activity, android.R.layout.simple_spinner_item, lista);
            spinner2.setAdapter(adapters);
        }
    }
}
