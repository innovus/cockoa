package com.example.android.cokoas.Fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.android.cokoas.Adapters.NotificacionAdapters;
import com.example.android.cokoas.Asyntask.NotificacionAsyntask;
import com.example.android.cokoas.MainActivity;
import com.example.android.cokoas.Models.Notificacion;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 20/05/2016.
 */
public class NotificacionFragment extends Fragment {
    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.notificacion_fragment, container, false);
        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Notificaciones");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<Notificacion> notificacions = new ArrayList<>();

        new NotificacionAsyntask(getActivity()).execute();


        /**prueba de notificaciones*/
        Notificacion notificacion = new Notificacion();
        notificacion.setTipoNotificacion("Inasistencia");
        notificacion.setMensajeNotificacion("su hijo no asistio  a la clase de Ingles el dia 29/02/02");
        notificacion.setFechaNotificacion("08/092016");

        notificacions.add(notificacion);
        Notificacion notificaciont = new Notificacion();

        notificaciont.setTipoNotificacion("Nota Actividad");
        notificaciont.setMensajeNotificacion("Su hijo obtubo una nota de 3.5 en la materia de Ingles");
        notificaciont.setFechaNotificacion("08/092016");

        notificacions.add(notificaciont);

        /***/


        //obtenemos el recycler
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.notifacion);
        mRecyclerView.setHasFixedSize(true);
        // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new NotificacionAdapters(notificacions, getActivity());
        mRecyclerView.setAdapter(mAdapter);

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
                    navigationView.getMenu().findItem(R.id.nav_calificaciones).setChecked(true);
                    navigationView.getMenu().findItem(R.id.nav_asistencia).setChecked(false);
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
