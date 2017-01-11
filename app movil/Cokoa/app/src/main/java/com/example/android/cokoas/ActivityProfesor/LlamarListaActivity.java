package com.example.android.cokoas.ActivityProfesor;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
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
import com.example.android.cokoas.SessionManager.SessionManager;

import java.util.ArrayList;
import java.util.Calendar;

public class LlamarListaActivity extends AppCompatActivity {
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    SessionManager sessionManager;
    private static TextView mostrarFecha;
    private static int año;
    private static int mes;
    private static int dia;

    private static RecyclerView mRecyclerView;
    private static RecyclerView.Adapter mAdapter;
    private static RecyclerView.LayoutManager mLayoutManager;
    private Button btnSelection;
    String id_carga_docente;
    static String   id_curso;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_llamar_lista);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        sessionManager = new SessionManager(getApplication());
        mostrarFecha = (TextView) findViewById(R.id.text_fecha_inasistencia);
        Calendar calendar = Calendar.getInstance();
        año = calendar.get(Calendar.YEAR);
        mes = calendar.get(Calendar.MONTH) + 1;
        dia = calendar.get(Calendar.DAY_OF_MONTH);
        mostrarFecha();

        id_carga_docente = getIntent().getStringExtra("id_carga_docente");
        id_curso = getIntent().getStringExtra("id_curso");

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

    public static void cargaDocente(Activity activity){
        ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
        new ListaInasistenciaAsyntask(activity).execute(id_curso);
        mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_view_llamrLista);
        mRecyclerView.setHasFixedSize(true);
        //usR UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(activity);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InsertarInasistenciaAdapters(estudianteCursos, activity);
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
    public void btnInsertarInasistencia(View v) {

        ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
        if(sessionManager.connectionCheck(this)) {
            for (int i=0;i<estudianteCursos.size();i++){
                EstudianteCurso estudianteCurso = estudianteCursos.get(i);
                estudianteCurso.setIdCargaDocente(id_carga_docente);
                estudianteCurso.setFecha(mostrarFecha.getText().toString());
            }
            new InsertInasistenciaAsyntask(this).execute(estudianteCursos);
            cargaDocente(this);
        }else {
            Snackbar.make(this.findViewById(android.R.id.content), "No se pudo registrar la calificación. Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }




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
