package com.example.android.cokoas.ActivityProfesor;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

import com.example.android.cokoas.AdaptersProfesor.InsertarInasistenciaAdapters;
import com.example.android.cokoas.AsyntaskProfesor.InsertInasistenciaAsyntask;
import com.example.android.cokoas.AsyntaskProfesor.ListaInasistenciaAsyntask;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.R;

import java.util.ArrayList;
import java.util.Calendar;

public class LlamarListaActivity extends AppCompatActivity {
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    private static TextView mostrarFecha;
    private static int año;
    private static int mes;
    private static int dia;

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Button btnSelection;
    String id_carga_docente;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_llamar_lista);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        mostrarFecha = (TextView) findViewById(R.id.text_fecha_inasistencia);
        Calendar calendar = Calendar.getInstance();
        año = calendar.get(Calendar.YEAR);
        mes = calendar.get(Calendar.MONTH) + 1;
        dia = calendar.get(Calendar.DAY_OF_MONTH);
        mostrarFecha();

         id_carga_docente = getIntent().getStringExtra("id_carga_docente");
        String  id_curso = getIntent().getStringExtra("id_curso");

        ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
        new ListaInasistenciaAsyntask(this).execute(id_curso);
        mRecyclerView = (RecyclerView) this.findViewById(R.id.my_recycler_view_llamrLista);
        mRecyclerView.setHasFixedSize(true);
        //usR UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InsertarInasistenciaAdapters(estudianteCursos, this);
        mRecyclerView.setAdapter(mAdapter);

    }


    public static void mostrarFecha(){
        mostrarFecha.setText(año+"/"+mes+"/"+dia);
    }

    public static class DatePickerFragment extends DialogFragment
            implements DatePickerDialog.OnDateSetListener {



        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            // Use the current date as the default date in the picker
            final Calendar c = Calendar.getInstance();
            int year = c.get(Calendar.YEAR);
            int month = c.get(Calendar.MONTH);
            int day = c.get(Calendar.DAY_OF_MONTH);

            // Create a new instance of DatePickerDialog and return it
            return new DatePickerDialog(getActivity(), this, year, month, day);
        }

        public void onDateSet(DatePicker view, int year, int month, int day) {
            año = year;
            mes = month+1;
            dia = day;
            mostrarFecha();


        }
    }
    public void SelectFecha(View v){
        DialogFragment newFragment = new DatePickerFragment();
        Bundle args = new Bundle();
        int vista = v.getBottom(); //.getId();
        args.putLong("vista",vista);
        newFragment.setArguments(args);
        newFragment.show(getSupportFragmentManager(),"qe pasa");
    }

    //insertar Inasistencia
    public void onManejadorEventoFecha(View v) {

        ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
        for (int i=0;i<estudianteCursos.size();i++){
            EstudianteCurso estudianteCurso = estudianteCursos.get(i);
            estudianteCurso.setIdCargaDocente(id_carga_docente);
            estudianteCurso.setFecha(mostrarFecha.getText().toString());
        }
        new InsertInasistenciaAsyntask(this).execute(estudianteCursos);


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
