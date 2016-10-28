package com.example.android.cokoas.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import com.example.android.cokoas.Asyntask.InasistenciaMateriaAsyntask;
import com.example.android.cokoas.R;
import com.google.firebase.iid.FirebaseInstanceId;

public class InasistenciaMateriaActivity extends AppCompatActivity {
    String id_materia;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inasistencia_materia);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        id_materia = getIntent().getStringExtra("id_materia");


       /* Bundle parametros = new Bundle();
        parametros.putString("id_materia", id_materia);
        if (savedInstanceState == null) {

            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            InasistenciaMateriaFragment inasistenciaMateriaFragment = new InasistenciaMateriaFragment();
            inasistenciaMateriaFragment.setArguments(parametros);
            fragmentTransaction.replace(R.id.fragment_inasistencias_materia, inasistenciaMateriaFragment);
            fragmentTransaction.commit();
        }*/



        new InasistenciaMateriaAsyntask(this).execute(id_materia);
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

    public void getTok(View view){

        String token = FirebaseInstanceId.getInstance().getToken();
        Log.d("firebase", "FBMToken: " + token);


    }



}