package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.os.AsyncTask;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.example.android.cokoas.Adapters.NotificacionAdapters;
import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.Models.Notificacion;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 17/10/2016.
 */
//extends AsyncTask<Void, Void, ArrayList<Inasistencia>> {
public class NotificacionAsyntask extends AsyncTask<Void, Void, ArrayList<Notificacion>>{
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;
    String serverUrls = AppConstants.serverUrl;
    private Activity activity;
    private final String LOG_TAG = NotificacionAsyntask.class.getSimpleName();

    public NotificacionAsyntask(Activity activity) {
        super();
        this.activity = activity;
    }
    @Override
    protected ArrayList<Notificacion> doInBackground(Void... params) {

        sessionManager = new SessionManager(activity.getApplication());
        // Estos dos deben ser declarados fuera de la try / catch
        // Fin de que puedan ser cerradas en el bloque finally .
        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        // Contendra las respuesta del JSON en un Araylist
        String forecastJsonStr = null;





        try {
            JSONObject jsonObjectNotificacion = new JSONObject();
            jsonObjectNotificacion.put("id_estudiante", "30011");
            // Construir la dirección URL para el appi materias
            // Posibles parámetros están disponibles en la página de la API de materias del liceo.
            URL url = new URL(serverUrls + "estudiantes/notificaciones");
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");
            String token = sessionManager.getKeyToken();
            Log.v("tokenSessionManager", "Json String" + token);
            urlConnection.setRequestProperty("Authorization", "Bearer " + token);
            OutputStreamWriter out = new OutputStreamWriter(urlConnection.getOutputStream());
            out.write(jsonObjectNotificacion.toString());
            out.close();
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
        } catch (JSONException e) {
            e.printStackTrace();
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
            return getNotificacion(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }

        return null;
    }

    public ArrayList<Notificacion> getNotificacion(String notificacionJson)throws JSONException {
        if(notificacionJson!=null){
            JSONArray jsonArray = new JSONArray(notificacionJson);
            ArrayList<Notificacion> notifications = new ArrayList<>();
            for (int i = 0;i<jsonArray.length();i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Notificacion notificacion = new Notificacion();
                String id_notificacion = jsonObject.getString("id_notificacion");
                String id_tipo_notificacion = jsonObject.getString("id_tipo_notificacion");
                String mensaje_notificacion = jsonObject.getString("mensaje_notificacion");
                String fecha_notificacion = jsonObject.getString("fecha_notificacion");

                notificacion.setIdNotificacion(id_notificacion);
                notificacion.setTipoNotificacion(id_tipo_notificacion);
                notificacion.setMensajeNotificacion(mensaje_notificacion);
                notificacion.setFechaNotificacion(fecha_notificacion);

                notifications.add(notificacion);

            }
            return notifications;
        }
        return null;
    }

    @Override
    protected void onPostExecute(ArrayList<Notificacion> notificacions) {
        super.onPostExecute(notificacions);
        if(notificacions!=null){
            mRecyclerView = (RecyclerView) activity.findViewById(R.id.notifacion);
            mRecyclerView.setHasFixedSize(true);
            // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
            //usar UN ADMINISTRADOR PARA LINEARLAYOUT
            mLayoutManager = new LinearLayoutManager(activity);
            mRecyclerView.setLayoutManager(mLayoutManager);
            mAdapter = new NotificacionAdapters(notificacions, activity);
            mRecyclerView.setAdapter(mAdapter);
        }
    }
}
