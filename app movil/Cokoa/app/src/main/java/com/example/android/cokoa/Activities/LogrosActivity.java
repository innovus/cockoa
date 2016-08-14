package com.example.android.cokoa.Activities;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
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
    String id_materia;
    String periodo_actual;
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    int aux =0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_logros);
        id_materia = getIntent().getStringExtra("id_materia");

        Bundle parametro = new Bundle();
        parametro.putString("id_materia", id_materia);
        parametro.putString("periodo_actual", "null");



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
        periodo_actual = getIntent().getStringExtra("id_materia");
        int numEntero = Integer.parseInt(periodo_actual)+1;
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
                String item = parent.getItemAtPosition(position).toString();

                String pos = Integer.toString(position);

                String s = Long.toString(id);
                if(position!=0){
                    Toast.makeText(parent.getContext(), "Selected: " + s, Toast.LENGTH_LONG).show();
                    aux = 1;

                    id_materia = getIntent().getStringExtra("id_materia");
                    periodo_actual = getIntent().getStringExtra("id_materia");
                    Bundle parametro = new Bundle();
                    parametro.putString("id_materia", id_materia);
                    parametro.putString("periodo_actual", Integer.toString(position));

                    fragmentManager = getSupportFragmentManager();
                    fragmentTransaction = fragmentManager.beginTransaction();
                    LogrosFragment logrosFragment = new LogrosFragment();
                    logrosFragment.setArguments(parametro);
                    fragmentTransaction.replace(R.id.fragments, logrosFragment);
                    fragmentTransaction.commit();
                }
                else {
                    if(aux==1){
                        Toast.makeText(parent.getContext(), "Selected: " + s, Toast.LENGTH_LONG).show();
                        id_materia = getIntent().getStringExtra("id_materia");

                        Bundle parametro = new Bundle();
                        parametro.putString("id_materia", id_materia);
                        parametro.putString("periodo_actual", "null");
                        fragmentManager = getSupportFragmentManager();
                        fragmentTransaction = fragmentManager.beginTransaction();
                        LogrosFragment logrosFragment = new LogrosFragment();
                        logrosFragment.setArguments(parametro);
                        fragmentTransaction.replace(R.id.fragments, logrosFragment);
                        fragmentTransaction.commit();
                    }

                }

                // Showing selected spinner item

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





        /*if(id==3){
            /*Toast toast1 =
                        Toast.makeText(activity, "status 400 sql vacio", Toast.LENGTH_SHORT);
                toast1.show();
            id_materia = getIntent().getStringExtra("id_materia");
            Bundle parametro = new Bundle();
            parametro.putString("id_materia", id_materia);
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            LogrosFragment logrosFragment = new LogrosFragment();
            logrosFragment.setArguments(parametro);
            fragmentTransaction.replace(R.id.fragments, logrosFragment);
            fragmentTransaction.commit();
            Toast toast = Toast.makeText(this, "opcion 3",Toast.LENGTH_LONG);
            toast.show();
        }*/
        return super.onOptionsItemSelected(item);

    }



}