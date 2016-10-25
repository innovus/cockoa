package com.example.android.cokoa.ActivityProfesor;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.android.cokoa.AsyntaskProfesor.ActividadLogroMateriaProfesorAsyntask;
import com.example.android.cokoa.R;

public class InsertarNotaActividadActivity extends AppCompatActivity {
    String descripcionLogro;
    TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_insertar_nota_actividad);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        descripcionLogro = getIntent().getStringExtra("descripcion_logro");
        textView = (TextView) this.findViewById(R.id.txt_desc_Logro_en_materia_profesor);
        textView.setText(descripcionLogro);

        new ActividadLogroMateriaProfesorAsyntask(this).execute();
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
