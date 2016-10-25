package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;

import com.example.android.cokoa.Fragments.NotasActividadFragment;
import com.example.android.cokoa.R;

public class NotasActivity extends AppCompatActivity {
    String id_materia,descripcionLogro;
    String id_logro;

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notas);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        id_materia = getIntent().getStringExtra("id_materia");
        id_logro = getIntent().getStringExtra("id_logro");
        descripcionLogro = getIntent().getStringExtra("descripcionLogro");


        Bundle parametros = new Bundle();
        parametros.putString("id_materia", id_materia);
        parametros.putString("id_logro", id_logro);
        parametros.putString("descripcionLogro",descripcionLogro);


        if (savedInstanceState == null) {
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            NotasActividadFragment notasActividadFragment = new NotasActividadFragment();
            notasActividadFragment.setArguments(parametros);
            fragmentTransaction.replace(R.id.fragment_notas, notasActividadFragment);
            fragmentTransaction.commit();
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
}
