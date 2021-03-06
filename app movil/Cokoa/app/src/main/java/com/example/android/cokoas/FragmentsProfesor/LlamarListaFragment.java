package com.example.android.cokoas.FragmentsProfesor;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ExpandableListView;

import com.example.android.cokoas.AdaptersProfesor.CalificacionesExpandableListViewAdapter;
import com.example.android.cokoas.AsyntaskProfesor.LlamarListaAsyntask;
import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.R;

/**
 * Created by ASUS on 13/08/2016.
 */
public class LlamarListaFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private ExpandableListView expandableListView;
    private CalificacionesExpandableListViewAdapter calificacionesExpandableListViewAdapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.expandablelistview_materias, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Llamar lista");
        return rootView;
    }
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
       /* ArrayList<CursosProfesor> cursosProfesor = new ArrayList<>();
        new LlamarListaAsyntask(getActivity()).execute();
        //obtenemos el recycler
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view);
        mRecyclerView.setHasFixedSize(true);
        // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new LlamarListaAdapters(cursosProfesor, getActivity());
        mRecyclerView.setAdapter(mAdapter);*/
        expandableListView = (ExpandableListView) getActivity().findViewById(R.id.expandableListView2);
        new LlamarListaAsyntask(getActivity()).execute();
        //MateriaGroup();
    }


}
