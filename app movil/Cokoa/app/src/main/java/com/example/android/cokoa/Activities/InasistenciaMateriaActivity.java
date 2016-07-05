package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;

import com.example.android.cokoa.Fragments.InasistenciaMateriaFragment;
import com.example.android.cokoa.R;

public class InasistenciaMateriaActivity extends AppCompatActivity {
    String id_materia;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inasistencia_materia);
        id_materia = getIntent().getStringExtra("id_materia");
        Bundle parametros = new Bundle();
        parametros.putString("id_materia", id_materia);
        if (savedInstanceState == null) {

            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            InasistenciaMateriaFragment inasistenciaMateriaFragment  = new InasistenciaMateriaFragment();
            inasistenciaMateriaFragment.setArguments(parametros);
            fragmentTransaction.replace(R.id.fragment_inasistencias_materia, inasistenciaMateriaFragment);
            fragmentTransaction.commit();
        }
    }

}
