package com.example.android.cokoa.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.widget.RecyclerView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoa.MainActivity;
import com.example.android.cokoa.R;

/**
 * Created by ASUS on 20/05/2016.
 */
public class AsistenciaFragment extends Fragment {
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.asistencia_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Asistencia");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        getView().setFocusableInTouchMode(true);
        getView().requestFocus();
        getView().setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {

               if (keyCode == KeyEvent.KEYCODE_BACK) {
                    //code
                    // Intent intent = new Intent(getActivity(),NotificationActivity.class);
                    //startActivity(intent);
                    //navigationView.getMenu().findItem(R.id.login).setVisible(false);
                    NavigationView navigationView = (NavigationView) getActivity().findViewById(R.id.nav_view);
                    navigationView.getMenu().findItem(R.id.nav_perfil).setChecked(true);
                    DrawerLayout drawer = (DrawerLayout) getActivity().findViewById(R.id.drawer_layout);
                    drawer.setFocusableInTouchMode(true);
                    drawer.closeDrawer(GravityCompat.START);
                    fragmentManager = getActivity().getSupportFragmentManager();
                    fragmentTransaction = fragmentManager.beginTransaction();
                    /*ForecastFragment forecastFragment = new ForecastFragment();
                    fragmentTransaction.replace(R.id.container, forecastFragment);*/
                   CalificacionesFragment calificacionesFragment = new CalificacionesFragment();
                   fragmentTransaction.replace(R.id.fragment,calificacionesFragment);
                    //fragmentTransaction.addToBackStack(null);
                    fragmentTransaction.commit();
                    return true;
                }
                return false;
            }
        });

    }
}
