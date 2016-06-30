package com.example.android.cokoa.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoa.Adapters.NotasActividadAdapters;
import com.example.android.cokoa.Asyntask.NotasActividadAsyntask;
import com.example.android.cokoa.Models.NotaActividad;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 23/06/2016.
 */
public class NotasActividadFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private String id_materia;
    private String id_logro;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.recycler, container, false);
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<NotaActividad> notaActividads = new ArrayList<>();
        Bundle args = getArguments();
        id_materia = args.getString("id_materia");
        id_logro = args.getString("id_logro");
        new NotasActividadAsyntask(this.getActivity()).execute(id_materia,id_logro);
        //obtenemos el recycler
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view_logro);
        mRecyclerView.setHasFixedSize(true);
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        /*mAdapter = new LogrosAdapters(areas,getActivity());
        mRecyclerView.setAdapter(mAdapter);*/
        mAdapter = new NotasActividadAdapters(notaActividads,getActivity());
        mRecyclerView.setAdapter(mAdapter);
    }
}
