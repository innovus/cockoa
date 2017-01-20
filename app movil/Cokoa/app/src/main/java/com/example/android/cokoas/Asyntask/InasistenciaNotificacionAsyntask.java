package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.os.AsyncTask;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.example.android.cokoas.Adapters.InasistenciaMateriaAdapters;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.Models.InasistenciaMateria;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by juancarlospantoja@hotmail.com on 30/10/2016.
 */
public class InasistenciaNotificacionAsyntask extends AsyncTask<String, Void, ArrayList<InasistenciaMateria>> {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;

    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = InasistenciaNotificacionAsyntask.class.getSimpleName();

    public InasistenciaNotificacionAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    protected ArrayList<InasistenciaMateria> doInBackground(String... params) {
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
            URL url = new URL(serverUrls + "inasistencias/estudiante/carga/"+params[0]+"");
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            String token = sessionManager.getKeyToken();

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
            return getInasisteciaMateria(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }


    public static ArrayList<InasistenciaMateria> getInasisteciaMateria(String inasistenciaJsonStr) throws JSONException {
        if (inasistenciaJsonStr != null) {
            // Ahora tenemos una cadena que representa todas las areas en formato JSON .
            // Afortunadamente análisis es fácil: constructor toma la cadena JSON y lo convierte
            // En una jerarquía de objetos para nosotros .
            // Estos son los nombres de los objetos JSON que necesitan ser extraídos .
            // La información de ubicación

            JSONArray inasistenciaArray = new JSONArray(inasistenciaJsonStr);

            ArrayList<InasistenciaMateria> inasistenciasArray = new ArrayList<InasistenciaMateria>();


            for (int i = 0; i < inasistenciaArray.length(); i++) {
                JSONObject inasistenciaTotal = inasistenciaArray.getJSONObject(i);
                String nombreDocente = "";
                String periodoInasistencia =  inasistenciaTotal.getString("numero_periodo");
                String fechaInasistencia = inasistenciaTotal.getString("fecha_inasistencia");
                String tipoInasistencia =  inasistenciaTotal.getString("estado_inasistencia");
                String nombreMateria =  inasistenciaTotal.getString("nombre_materia");


                if (!inasistenciaTotal.isNull("nombre1")) {
                    nombreDocente = inasistenciaTotal.getString("nombre1");
                }

                if (!inasistenciaTotal.isNull("nombre2")) {
                    nombreDocente = nombreDocente +" "+ inasistenciaTotal.getString("nombre2");
                }

                if (!inasistenciaTotal.isNull("apellido1")) {
                    nombreDocente = nombreDocente +" "+ inasistenciaTotal.getString("apellido1");
                }

                if (!inasistenciaTotal.isNull("apellido2")) {
                    nombreDocente = nombreDocente +" "+ inasistenciaTotal.getString("apellido2");
                }






                InasistenciaMateria inasistenciaMateria = new InasistenciaMateria();
                inasistenciaMateria.setNombreMateria(nombreMateria);
                inasistenciaMateria.setNombreProfesor(nombreDocente);
                inasistenciaMateria.setNumeroPeriodo(periodoInasistencia);
                try {
                    Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(fechaInasistencia);
                    String newstring = new SimpleDateFormat("yyyy-MM-dd").format(date);
                    inasistenciaMateria.setFechaInasistencia(newstring);

                } catch (ParseException e) {
                    e.printStackTrace();
                }
                if(tipoInasistencia.equals("0")){
                    inasistenciaMateria.setTipoInasistencia("Falta");
                    inasistenciaMateria.setJustificadaInasistencia("Si");
                }
                if(tipoInasistencia.equals("1")){
                    inasistenciaMateria.setTipoInasistencia("Falta");
                    inasistenciaMateria.setJustificadaInasistencia("No");
                }
                if(tipoInasistencia.equals("3")){
                    inasistenciaMateria.setTipoInasistencia("Retraso");
                    inasistenciaMateria.setJustificadaInasistencia("No");
                }
                if(tipoInasistencia.equals("4")){
                    inasistenciaMateria.setTipoInasistencia("Retraso");
                    inasistenciaMateria.setJustificadaInasistencia("Si");
                }

                inasistenciasArray.add(inasistenciaMateria);


            }


            return inasistenciasArray;
        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<InasistenciaMateria> result) {
        super.onPostExecute(result);
        if (result != null) {
            ArrayList<String> status = new ArrayList(result);
            if (status.get(0) == "400") {
                Toast toast1 =
                        Toast.makeText(activity, "No tiene inasistencias", Toast.LENGTH_SHORT);
                toast1.show();

            }else {


                int position = result.size()-1;

                TextView nameMateria,nombreProfesor;
                nameMateria = (TextView) activity.findViewById(R.id.id_text_nombreMateria);
                nombreProfesor = (TextView) activity.findViewById(R.id.id_text_nombreProfesor);
                nameMateria.setText( result.get(position).getNombreMateria());
                nombreProfesor.setText(result.get(position).getNombreProfesor());

                mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_inasistencia_materia);
                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new InasistenciaMateriaAdapters(result, activity);
                mRecyclerView.setAdapter(mAdapter);

            }
        }
    }
}
