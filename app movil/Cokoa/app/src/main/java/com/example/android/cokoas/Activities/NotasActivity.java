package com.example.android.cokoas.Activities;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import com.example.android.cokoas.Asyntask.NotaActividadNotificacionAsyntask;
import com.example.android.cokoas.Asyntask.NotasActividadAsyntask;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

public class NotasActivity extends AppCompatActivity {
    String id_materia,descripcionLogro,notificacion;
    String id_logro;
    String a;
    SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notas);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        Intent startingIntent = getIntent();
        Bundle className = startingIntent.getExtras();
        a = (String) className.get("guia");

        sessionManager = new SessionManager(this);
        if(sessionManager.connectionCheck(this)) {
            if (a == null) {
                notificacion = getIntent().getStringExtra("notificacion");
                if (notificacion == null) {
                    id_materia = getIntent().getStringExtra("id_materia");
                    id_logro = getIntent().getStringExtra("id_logro");
                    descripcionLogro = getIntent().getStringExtra("descripcionLogro");
                    new NotasActividadAsyntask(this).execute(id_materia,id_logro,descripcionLogro);
                }
                else {
                    new NotaActividadNotificacionAsyntask(this).execute(getIntent().getStringExtra("id_materia"));
                }
            }else {
                new NotaActividadNotificacionAsyntask(this).execute(a);
            }
        }else{
            Snackbar.make(this.findViewById(android.R.id.content), "Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }









       // new NotaActividadNotificacionAsyntask(this).execute("14");


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
}
