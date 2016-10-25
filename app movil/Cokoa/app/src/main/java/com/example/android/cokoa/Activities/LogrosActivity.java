package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.android.cokoa.Fragments.LogrosFragment;
import com.example.android.cokoa.R;

import java.util.ArrayList;
import java.util.List;

//implements OnItemSelectedListener
public class LogrosActivity extends AppCompatActivity {
    String id_materia,nombreMateria;
    String periodo_actual;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    int aux =0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logros);
        id_materia = getIntent().getStringExtra("id_materia");
        nombreMateria = getIntent().getStringExtra("nombre_materia");
        Bundle parametro = new Bundle();
        parametro.putString("id_materia", id_materia);
        parametro.putString("nombreMateria" ,nombreMateria);
        parametro.putString("periodo_actual", "null");
        parametro.putString("sheckPeriodo", "false");//sheckPeriodo

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);



        if (savedInstanceState == null) {

            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            LogrosFragment logrosFragment = new LogrosFragment();
            logrosFragment.setArguments(parametro);
            fragmentTransaction.replace(R.id.fragments, logrosFragment);
            fragmentTransaction.commit();


        }
    }





    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        List<String> list = new ArrayList<String>();
        //periodo_actual
        periodo_actual = getIntent().getStringExtra("periodo_actual");
        int numEntero = Integer.parseInt(periodo_actual);
        list.add("Periodo");
        for(int i=1;i<=numEntero;i++){
            list.add("Periodo: "+i);
        }


        getMenuInflater().inflate(R.menu.android_action_bar_spinner_menu, menu);
        MenuItem item = menu.findItem(R.id.spinner);
        Spinner spinner = (Spinner) MenuItemCompat.getActionView(item);



       // ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,R.array.spinner_list_item_array, android.R.layout.simple_spinner_item);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,R.layout.my_spinner_textview, list);

        adapter.setDropDownViewResource(R.layout.my_spinner_textview);

        spinner.setAdapter(adapter);
        spinner.setGravity(Gravity.CENTER);

        // spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {




                String s = Long.toString(id);
                if(position!=0){
                    Toast.makeText(parent.getContext(), "Selected: " + s, Toast.LENGTH_LONG).show();
                    aux = 1;
                    id_materia = getIntent().getStringExtra("id_materia");
                    periodo_actual = getIntent().getStringExtra("periodo_actual");
                    Bundle parametro = new Bundle();
                    parametro.putString("id_materia", id_materia);
                    parametro.putString("nombreMateria" ,nombreMateria);
                    parametro.putString("periodo_actual", Integer.toString(position));
                    parametro.putString("sheckPeriodo", "true");
                    fragmentManager = getSupportFragmentManager();
                    fragmentTransaction = fragmentManager.beginTransaction();
                    LogrosFragment logrosFragment = new LogrosFragment();
                    logrosFragment.setArguments(parametro);
                    fragmentTransaction.replace(R.id.fragments, logrosFragment);
                    fragmentTransaction.commit();
                }




            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }


        });


        return true;
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
