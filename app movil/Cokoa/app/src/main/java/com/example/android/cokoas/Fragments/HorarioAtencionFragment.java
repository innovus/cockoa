package com.example.android.cokoas.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.R;

/**
 * Created by ASUS on 20/05/2016.
 */
public class HorarioAtencionFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.horario_atencion_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Horarios de atenciòn");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        Bundle args = getArguments();
        String token = args.getString("token");
        // TextView textView = (TextView) getActivity().findViewById(R.id.txtNombreMateria);
        EditText editText = (EditText) getActivity().findViewById(R.id.txttoken);
        editText.setText(token);
    }
}