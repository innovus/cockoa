package com.example.android.cokoas.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoas.Asyntask.AsyntaskPerfil;
import com.example.android.cokoas.AsyntaskProfesor.PerfilProfesorAsyntask;
import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.R;

/**
 * Created by ASUS on 20/05/2016.
 */
public class PerfilFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.perfil_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Perfil");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        Bundle args = getArguments();
        String tipoPerfil = args.getString("Tipo_Perfil");
        if(tipoPerfil.equals("Estudiante")){
            new AsyntaskPerfil(getActivity()).execute();
        }else {
            new PerfilProfesorAsyntask(getActivity()).execute();
        }

    }
}
