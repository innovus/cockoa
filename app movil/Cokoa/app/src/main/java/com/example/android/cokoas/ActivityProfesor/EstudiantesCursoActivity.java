package com.example.android.cokoas.ActivityProfesor;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.android.cokoas.AdaptersProfesor.EstudianteCursoAdapters;
import com.example.android.cokoas.AsyntaskProfesor.EstudianteCursoProfesorAsyntask;
import com.example.android.cokoas.AsyntaskProfesor.NotaActividadAsyntask;
import com.example.android.cokoas.AsyntaskProfesor.SpinerLogrosAsintask;
import com.example.android.cokoas.AsyntaskProfesor.SpinnerActividadAsyntask;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.ModelsProfesor.NotaActividadProfesor;
import com.example.android.cokoas.R;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

public class EstudiantesCursoActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {
    private Spinner spinner1, spinner2;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;


    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    public Activity activity = this;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_estudiantes_curso);


        new SpinerLogrosAsintask(this).execute();

        spinner1 = (Spinner) this.findViewById(R.id.spinner2);
        spinner2 = (Spinner) this.findViewById(R.id.spinner3);
        spinner1.setOnItemSelectedListener(this);
        spinner2.setOnItemSelectedListener(this);


    }


    public void calificar(View view) throws ExecutionException, InterruptedException {
        NotaActividadAsyntask notaActividadAsyntask = (NotaActividadAsyntask) new NotaActividadAsyntask(this).execute();
        ArrayList<NotaActividadProfesor> notaActividadProfesor = notaActividadAsyntask.get();

        if (notaActividadProfesor != null) {
            ArrayList<String> status = new ArrayList(notaActividadProfesor);
            if (status.get(0) == "400") {
                Toast toast1 =
                        Toast.makeText(activity, "status 400 sql vacio", Toast.LENGTH_SHORT);
                toast1.show();

            } else {
                Log.v("getAr", "get" + notaActividadProfesor.get(0).getNotaActividad());
                EstudianteCursoProfesorAsyntask estudianteCursoProfesorAsyntask = (EstudianteCursoProfesorAsyntask) new EstudianteCursoProfesorAsyntask(this).execute();
                ArrayList<EstudianteCurso> estudianteCursos = estudianteCursoProfesorAsyntask.get();

                for (int i = 0; i < estudianteCursos.size(); i++) {

                    for (int j = 0; j < notaActividadProfesor.size(); j++) {
                        if (estudianteCursos.get(i).getCodigoEstudiante().equals(notaActividadProfesor.get(j).getIdEstudiante())) {
                            estudianteCursos.get(i).setNotaEstudiante(notaActividadProfesor.get(j).getNotaActividad());
                            i++;
                        } else {
                            estudianteCursos.get(i).setNotaEstudiante(" - ");

                        }
                    }


                }


                mRecyclerView = (RecyclerView) activity.findViewById(R.id.my_recycler_curso_materia);
                mRecyclerView.setHasFixedSize(true);
                //usR UN ADMINISTRADOR PARA LINEARLAYOUT
                mLayoutManager = new LinearLayoutManager(activity);
                mRecyclerView.setLayoutManager(mLayoutManager);
                mAdapter = new EstudianteCursoAdapters(estudianteCursos, activity);
                mRecyclerView.setAdapter(mAdapter);




            }


        } else {
            Log.v("getAr", "no hay error jejeje");
        }


    }




    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

        switch (parent.getId()) {
            case R.id.spinner2:
                if (position > 0) {
                    new SpinnerActividadAsyntask(this).execute();
                }
                if (position == 0) {

                    spinner2.setVisibility(View.INVISIBLE);
                }
                break;
            case R.id.spinner3:
                if (position > 0) {

                    new EstudianteCursoProfesorAsyntask(this).execute();
                }
                if (position == 0) {
                    ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
                    //obtenemos el recycler




                    mRecyclerView = (RecyclerView) this.findViewById(R.id.my_recycler_curso_materia);
                    mRecyclerView.setHasFixedSize(true);
                    // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
                    //usar UN ADMINISTRADOR PARA LINEARLAYOUT
                    mLayoutManager = new LinearLayoutManager(this);
                    mRecyclerView.setLayoutManager(mLayoutManager);
                    //recyclerView.setItemAnimator(ItemAnimator animator);
                    // mRecyclerView.setItemAnimator(ItemAnimator animator);
                    mAdapter = new EstudianteCursoAdapters(estudianteCursos, this);
                    mRecyclerView.setAdapter(mAdapter);



                }

                break;
        }

    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
