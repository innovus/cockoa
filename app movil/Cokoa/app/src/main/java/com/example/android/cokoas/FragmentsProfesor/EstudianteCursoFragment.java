package com.example.android.cokoas.FragmentsProfesor;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Spinner;

import com.example.android.cokoas.AdaptersProfesor.EstudianteCursoAdapters;
import com.example.android.cokoas.AsyntaskProfesor.EstudianteCursoProfesorAsyntask;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 13/07/2016.
 */
public class EstudianteCursoFragment extends Fragment {
    private Spinner spinner1;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater,ViewGroup container,Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.activity_estudiantes_curso, container, false);
        //((MainActivity) getActivity()).getSupportActionBar().setTitle("Agregar Calificaciones");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
        //obtenemos el recycler

       /* spinner1 = (Spinner) getActivity().findViewById(R.id.spinner2);
        String []opciones={"sumar","restar","multiplicar","culiar"};
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),android.R.layout.simple_spinner_item, opciones);
        spinner1.setAdapter(adapter);*/

        new EstudianteCursoProfesorAsyntask(getActivity()).execute();



        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_curso_materia);
        mRecyclerView.setHasFixedSize(true);
        // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        //recyclerView.setItemAnimator(ItemAnimator animator);
        // mRecyclerView.setItemAnimator(ItemAnimator animator);
        mAdapter = new EstudianteCursoAdapters(estudianteCursos,getActivity());
        mRecyclerView.setAdapter(mAdapter);



    }


}
