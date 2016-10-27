package com.example.android.cokoas.Fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.R;

/**
 * Created by ASUS on 20/05/2016.
 */
public class InboxFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.perfil_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("");
        return rootView;
    }
}
