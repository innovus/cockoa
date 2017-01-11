package com.example.android.cokoas.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Adapters.NotasActividadAdapters;
import com.example.android.cokoas.Asyntask.NotasActividadAsyntask;
import com.example.android.cokoas.Models.NotaActividad;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 23/06/2016.
 */
public class NotasActividadFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private String id_materia;
    private String id_logro,descripcionLogro;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.nota_actividad_fragment, container, false);
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<NotaActividad> notaActividads = new ArrayList<>();
        Bundle args = getArguments();
        id_materia = args.getString("id_materia");
        id_logro = args.getString("id_logro");
        descripcionLogro = args.getString("descripcionLogro");
        // descripcionLogro = getIntent().getStringExtra("descripcionLogro");
        TextView textView = (TextView) getActivity().findViewById(R.id.txtActividadLogro);
        textView.setText(descripcionLogro);
        new NotasActividadAsyntask(this.getActivity()).execute(id_materia,id_logro);
        //obtenemos el recycler
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view_actividad_logro);
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
