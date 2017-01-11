package com.example.android.cokoas.Activities;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import com.example.android.cokoas.Asyntask.InasistenciaMateriaAsyntask;
import com.example.android.cokoas.Asyntask.InasistenciaNotificacionAsyntask;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

public class InasistenciaMateriaActivity extends AppCompatActivity {
    String notificacion;
    SessionManager sessionManager;
    String a;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inasistencia_materia);
        sessionManager = new SessionManager(getApplication());
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        Intent startingIntent = getIntent();
        Bundle className = startingIntent.getExtras();
        a = (String) className.get("guia");


        if(sessionManager.connectionCheck(this)){
            if (a == null) {
                notificacion = getIntent().getStringExtra("notificacion");
                if (notificacion == null) {
                    new InasistenciaMateriaAsyntask(this).execute(getIntent().getStringExtra("id_materia"));
                } else {
                    new InasistenciaNotificacionAsyntask(this).execute(getIntent().getStringExtra("id_materia"), sessionManager.getIdEstudiante());
                }
            } else {
                new InasistenciaNotificacionAsyntask(this).execute(a, sessionManager.getIdEstudiante());
            }
        }else {
            Snackbar.make(this.findViewById(android.R.id.content), "Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }

    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home: //hago un case por si en un futuro agrego mas opciones
                Log.i("ActionBar", "Atrás!");
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void getTok(View view) {

        // String token = FirebaseInstanceId.getInstance().getToken();
        // Log.d("firebase", "FBMToken: " + token);


    }


}
