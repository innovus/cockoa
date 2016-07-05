package com.example.android.cokoa.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoa.Adapters.InasistenciaMateriaAdapters;
import com.example.android.cokoa.Asyntask.InasistenciaMateriaAsyntask;
import com.example.android.cokoa.Models.InasistenciaMateria;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 30/06/2016.
 */
public class InasistenciaMateriaFragment extends Fragment{
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private String id_materia;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.activity_inasistencia_materia, container, false);
        //        View rootView = inflater.inflate(R.layout.inasistencia_materia_fragment, container, false);

        // ((MainActivity) getActivity()).getSupportActionBar().setTitle("Inasistencias");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);



        ArrayList<InasistenciaMateria> inasistenciaMaterias = new ArrayList<>();
        Bundle args = getArguments();
        id_materia = args.getString("id_materia");
        new InasistenciaMateriaAsyntask(this.getActivity()).execute(id_materia);
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_inasistencia_materia);
        mRecyclerView.setHasFixedSize(true);
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InasistenciaMateriaAdapters(inasistenciaMaterias,getActivity());
        mRecyclerView.setAdapter(mAdapter);


    }
}
