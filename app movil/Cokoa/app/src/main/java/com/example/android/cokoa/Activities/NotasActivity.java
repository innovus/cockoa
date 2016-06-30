package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;

import com.example.android.cokoa.Fragments.NotasActividadFragment;
import com.example.android.cokoa.R;

public class NotasActivity extends AppCompatActivity {
    String id_materia;
    String id_logro;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notas);
        id_materia = getIntent().getStringExtra("id_materia");
        id_logro = getIntent().getStringExtra("id_logro");
        Bundle parametros = new Bundle();
        parametros.putString("id_materia", id_materia);
        parametros.putString("id_logro", id_logro);


        if (savedInstanceState == null) {
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            NotasActividadFragment notasActividadFragment = new NotasActividadFragment();
            notasActividadFragment.setArguments(parametros);
            fragmentTransaction.replace(R.id.fragment_notas, notasActividadFragment);
            fragmentTransaction.commit();
        }
    }
}
