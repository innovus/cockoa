package com.example.android.cokoas.ActivityProfesor;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.android.cokoas.AsyntaskProfesor.LogrosMateriaProfesorAsyntask;
import com.example.android.cokoas.R;

public class LogrosMateriaEstudianteProfesorActivity extends AppCompatActivity {
    String nombreMateria,idCargaDocente,id_curso;
    TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logros_materia_estudiante_profesor);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        id_curso = getIntent().getStringExtra("id_curso");
        idCargaDocente = getIntent().getStringExtra("id_carda_docente");
        textView = (TextView) this.findViewById(R.id.txtNombreMateriaProfesor);
        textView.setText(getIntent().getStringExtra("nombre_materia"));
        new LogrosMateriaProfesorAsyntask(this).execute(idCargaDocente,id_curso);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

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
