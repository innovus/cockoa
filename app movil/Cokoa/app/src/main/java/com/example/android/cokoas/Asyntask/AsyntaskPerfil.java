package com.example.android.cokoas.Asyntask;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.android.cokoas.AppConstants.AppConstants;
import com.example.android.cokoas.Models.Perfil;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by juancarlospantoja@hotmail.com on 20/01/2017.
 */
public class AsyntaskPerfil extends AsyncTask<Void, Void, Perfil> {
    SessionManager sessionManager;
    Activity activity;
    String serverUrls = AppConstants.serverUrl;
    String urlfotografia = AppConstants.urlFotografia;
    ProgressDialog progressDialog;
    private final String LOG_TAG = AsyntaskPerfil.class.getSimpleName();
    public AsyntaskPerfil(Activity activity){
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
        progressDialog.setCancelable(true);
        progressDialog.getWindow().setGravity(Gravity.CENTER);
        progressDialog.show();
    }


    @Override
    protected Perfil doInBackground(Void... params) {
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
            URL url = new URL(serverUrls + "api/todos/perfil");
            //Crear el request para el liceo, abre una conexión
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("Content-Type", "application/json");
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

                    return null;
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
            return getPerfil(forecastJsonStr);
            //return  null;
        } catch (JSONException e) {
            Log.e("error", e.getMessage(), e);
            e.printStackTrace();
        }


        return null;
    }

    public Perfil getPerfil(String JsonPerfil)throws JSONException{
        if(JsonPerfil!=null){
            JSONObject jsonObject = new JSONObject((JsonPerfil));
            Perfil perfil = new Perfil();
            String identificacionEstudiante = jsonObject.getString("identificacion");
            perfil.setIdPerfil(jsonObject.getString("id_estudiante"));
            perfil.setNombre(jsonObject.getString("nombre1")+" "+jsonObject.getString("apellido1"));
            perfil.setDireccion(jsonObject.getString("direccion"));
            perfil.setCelular(jsonObject.getString("celular"));
            perfil.setEmail(jsonObject.getString("email"));
            perfil.setIdentificacion(identificacionEstudiante);
            return perfil;


        }

        return null;
    }

    @Override
    protected void onPostExecute(Perfil perfils) {

        if(perfils!=null){
            LinearLayout linearLayout = (LinearLayout) activity.findViewById(R.id.linear_perfil_codigo);
            linearLayout.setVisibility(View.VISIBLE);

            TextView txtNombre = (TextView) activity.findViewById(R.id.txt_nombre_perfil);
            txtNombre.setText(perfils.getNombre());

            TextView txtIdentificacion = (TextView) activity.findViewById(R.id.txt_indentificacion_perfil);
            txtIdentificacion.setText(perfils.getIdentificacion());

            TextView txtCodigo = (TextView) activity.findViewById(R.id.txt_id_perfil);
            txtCodigo.setText(perfils.getIdPerfil());

            TextView txtEmail = (TextView) activity.findViewById(R.id.txt_email_perfil);
            txtEmail.setText(perfils.getEmail());

            TextView txtCelular = (TextView) activity.findViewById(R.id.txt_celular_perfil);
            txtCelular.setText(perfils.getCelular());

            TextView txtDireccion = (TextView) activity.findViewById(R.id.txt_direccion_perfil);
            txtDireccion.setText(perfils.getDireccion());


            de.hdodenhof.circleimageview.CircleImageView circleImageView = (CircleImageView) activity.findViewById(R.id.img_perfil);

            Uri uri = Uri.parse(urlfotografia+perfils.getIdPerfil()+".jpg");
            Context context = circleImageView.getContext();
            Picasso.with(context).load(uri).error(R.drawable.escudo).into(circleImageView);
            progressDialog.dismiss();

        }
        super.onPostExecute(perfils);
        progressDialog.dismiss();
    }
}
