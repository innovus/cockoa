package com.example.android.cokoa.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoa.MainActivity;
import com.example.android.cokoa.R;

/**
 * Created by ASUS on 20/05/2016.
 */
public class AsistenciaFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.asistencia_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Asistencia");
        return rootView;
    }
}