package com.example.android.cokoa.ActivityProfesor;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

import com.example.android.cokoa.AdaptersProfesor.InsertarInasistenciaAdapters;
import com.example.android.cokoa.AsyntaskProfesor.InsertInasistenciaAsyntask;
import com.example.android.cokoa.AsyntaskProfesor.ListaInasistenciaAsyntask;
import com.example.android.cokoa.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoa.R;

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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_llamar_lista);
        mostrarFecha = (TextView) findViewById(R.id.text_fecha_inasistencia);
        Calendar calendar = Calendar.getInstance();
        año = calendar.get(Calendar.YEAR);
        mes = calendar.get(Calendar.MONTH)+1;
        dia = calendar.get(Calendar.DAY_OF_MONTH);
        mostrarFecha();
       /* if (savedInstanceState == null) {

            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            SeleccionarInasistenciaFragment inasistenciaMateriaFragment  = new SeleccionarInasistenciaFragment();
            fragmentTransaction.replace(R.id.frame_llamar_lista, inasistenciaMateriaFragment);
            fragmentTransaction.commit();
        }*/


        btnSelection = (Button) this.findViewById(R.id.buttonjuan);

        //juan = (TextView) this.findViewById(R.id.text_fecha_inasistencia);

        ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
        new ListaInasistenciaAsyntask(this).execute();
        mRecyclerView = (RecyclerView) this.findViewById(R.id.my_recycler_view_llamrLista);
        mRecyclerView.setHasFixedSize(true);
        //usR UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InsertarInasistenciaAdapters(estudianteCursos, this);
        mRecyclerView.setAdapter(mAdapter);

        /*btnSelection.setOnClickListener(new OnClickListener() {

   @Override
   public void onClick(View v) {*/

        btnSelection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               /* JSONArray jsonArray = new JSONArray();
                ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
                for (int i=0;i<estudianteCursos.size();i++){
                    EstudianteCurso estudianteCurso = estudianteCursos.get(i);
                    if(estudianteCurso.isInasistencia()==true){
                        JSONObject jsonObject = new JSONObject();
                        try {
                            jsonObject.put("id_periodo",1);
                            jsonObject.put("id_estudiante", Integer.parseInt(estudianteCurso.getCodigoEstudiante()));
                            jsonObject.put("fecha_inasistencia","02/02/2016");
                            jsonObject.put("id_carga","1");
                            jsonArray.put(jsonObject);
                            //{"id_periodo": 1, "id_estudiante":1 ,"estado_inasistencia":1,"fecha_inasistencia": "02/02/2016","id_carga": 1}

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }

                }

                Toast.makeText(getActivity(),"->"+jsonArray,Toast.LENGTH_LONG)
                        .show();*/
               /* ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
                new InsertInasistenciaAsyntask(View).execute(estudianteCursos);*/




            }


        });


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

    public void onManejadorEventoFecha(View v) {
       /* DialogFragment newFragment = new DatePickerFragment();
        Bundle args = new Bundle();
        int vista = v.getBottom(); //.getId();
        args.putLong("vista",vista);
        newFragment.setArguments(args);
        newFragment.show(getSupportFragmentManager(),"qe pasa");*/



       // ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
       // ArrayList<EstudianteCurso> estudianteCursos = InsertarInasistenciaAdapters
        ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
        for (int i=0;i<estudianteCursos.size();i++){
            EstudianteCurso estudianteCurso = estudianteCursos.get(i);
            estudianteCurso.setFecha(mostrarFecha.getText().toString());
        }
        new InsertInasistenciaAsyntask(this).execute(estudianteCursos);


    }




}
