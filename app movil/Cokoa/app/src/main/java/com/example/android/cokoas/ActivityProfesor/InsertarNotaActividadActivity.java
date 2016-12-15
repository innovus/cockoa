package com.example.android.cokoas.ActivityProfesor;

import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import com.example.android.cokoas.AsyntaskProfesor.ActividadLogroMateriaProfesorAsyntask;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

public class InsertarNotaActividadActivity extends AppCompatActivity {
    String idLogro,descripcionLogro,idCurso,idCargaDocente;
    TextView textView;
    SessionManager sessionManage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_insertar_nota_actividad);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        idCurso = getIntent().getStringExtra("id_curso");
        idCargaDocente = getIntent().getStringExtra("id_carga_docente");
        idLogro = getIntent().getStringExtra("id_logro");
        descripcionLogro = getIntent().getStringExtra("descripcion_logro");
        textView = (TextView) this.findViewById(R.id.txt_desc_Logro_en_materia_profesor);
        textView.setText(descripcionLogro);


        sessionManage = new SessionManager(getApplication());
        if(sessionManage.connectionCheck(this)) {
            new ActividadLogroMateriaProfesorAsyntask(this).execute(idLogro,idCurso,idCargaDocente);
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


    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        switch (item.getItemId()) {
            case android.R.id.home: //hago un case por si en un futuro agrego mas opciones
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
