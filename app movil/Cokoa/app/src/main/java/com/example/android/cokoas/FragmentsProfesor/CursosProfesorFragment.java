package com.example.android.cokoas.FragmentsProfesor;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoas.AsyntaskProfesor.CursosAsyntaskProfresor;
import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.ModelsProfesor.CursosProfesor;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 05/07/2016.
 */
public class CursosProfesorFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    SessionManager sessionManager;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.expandablelistview_materias, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Agregar Calificaciones");
        return rootView;
    }


    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<CursosProfesor> cursosProfesor = new ArrayList<>();

        sessionManager = new SessionManager(getActivity());
        if(sessionManager.connectionCheck(getActivity())) {
            new CursosAsyntaskProfresor(getActivity()).execute();
        }else{
            Snackbar.make(getActivity().findViewById(android.R.id.content), "Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }

        //obtenemos el recycler
       /* mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view);
        mRecyclerView.setHasFixedSize(true);
        // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new CusosProfesorAdapters(cursosProfesor, getActivity());
        mRecyclerView.setAdapter(mAdapter);*/
    }
}
