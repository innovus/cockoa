package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;

import com.example.android.cokoa.Fragments.LogrosFragment;
import com.example.android.cokoa.R;

public class LogrosActivity extends AppCompatActivity {
    String id_materia;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logros);
        id_materia = getIntent().getStringExtra("id_materia");
        Bundle parametro = new Bundle();
        parametro.putString("id_materia",id_materia);
        //fragment.setArguments(parametro);
        if (savedInstanceState == null) {
            /*fragmentManager = getSupportFragmentManager();
                fragmentTransaction = fragmentManager.beginTransaction();
                AsistenciaFragment asistenciaFragment = new AsistenciaFragment();
                fragmentTransaction.replace(R.id.fragment, asistenciaFragment);
                fragmentTransaction.commit();*/

            /*FragmentClass fragInfo = new FragmentClass();
fragInfo.setArguments(bundle);
transaction.replace(R.id.fragment_single, fragInfo);
transaction.commit();*/
           /* LogrosFragment logrosFragment = new LogrosFragment();
            logrosFragment.setArguments(parametro);*/

            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            LogrosFragment logrosFragment = new LogrosFragment();
            logrosFragment.setArguments(parametro);
            fragmentTransaction.replace(R.id.fragments, logrosFragment);
            fragmentTransaction.commit();


            /*getSupportFragmentManager().beginTransaction()
                    .add(R.id.fragments, new LogrosFragment())
                    .commit();*/
        }
    }
}
