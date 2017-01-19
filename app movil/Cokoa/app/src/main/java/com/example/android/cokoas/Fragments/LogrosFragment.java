package com.example.android.cokoas.Fragments;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Adapters.LogrosAdapters;
import com.example.android.cokoas.Asyntask.LogrosAsyntask;
import com.example.android.cokoas.Models.Logro;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

import java.util.ArrayList;

/**
 * Created by ASUS on 09/06/2016.
 */
public class LogrosFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private String id_materia;
    SessionManager sessionManager;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.recycler, container, false);
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        ArrayList<Logro> areas = new ArrayList<>();
        Bundle args = getArguments();
        String id_materia = args.getString("id_materia");
        String nombreMateria = args.getString("nombreMateria");
        String numero_periodo = args.getString("periodo_actual");
        String sheckPeriodo = args.getString("sheckPeriodo");

        TextView textView = (TextView) getActivity().findViewById(R.id.txtNombreMateria);
        textView.setText(nombreMateria);

      /*  if(numero_periodo.equals("null")){
            new LogrosAsyntask(this.getActivity()).execute(id_materia);
        }else {
            new LogrosPeriodoAsyntask(this.getActivity()).execute(id_materia,numero_periodo);
        }*/
        sessionManager = new SessionManager(getActivity());
        if(sessionManager.connectionCheck(getActivity())) {
            if (sheckPeriodo.equals("false")) {
                new LogrosAsyntask(this.getActivity()).execute(id_materia, "false",numero_periodo,nombreMateria);
            } else {
                new LogrosAsyntask(this.getActivity()).execute(id_materia, "true", numero_periodo,nombreMateria);
            }
        }else {
            Snackbar.make(getActivity().findViewById(android.R.id.content), "Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                    .setAction("", new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {

                        }
                    })
                    .setActionTextColor(Color.YELLOW)
                    .show();
        }



        //new LogrosAsyntask(this.getActivity()).execute(id_materia,"sheckPeriodo");
        //obtenemos el recycler
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view_logro);
        mRecyclerView.setHasFixedSize(true);
        // mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        //recyclerView.setItemAnimator(ItemAnimator animator);
        // mRecyclerView.setItemAnimator(ItemAnimator animator);
        // specify an adapter (see also next example)
        mAdapter = new LogrosAdapters(areas, getActivity());
        mRecyclerView.setAdapter(mAdapter);

        /*ArrayList<InasistenciaMateria> inasistenciaMaterias = new ArrayList<>();
        Bundle args = getArguments();
        id_materia = args.getString("id_materia");
        new InasistenciaMateriaAsyntask(this.getActivity()).execute(id_materia);
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_inasistencia_materia);
        mRecyclerView.setHasFixedSize(true);
        //usar UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InasistenciaMateriaAdapters(inasistenciaMaterias,getActivity());
        mRecyclerView.setAdapter(mAdapter);*/

        //getView().setFocusableInTouchMode(true);
        getView().setFocusableInTouchMode(true);
        getView().requestFocus();
        getView().setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
               /* if (event.getAction() == KeyEvent.ACTION_UP && keyCode == KeyEvent.KEYCODE_BACK) {
                    Log.e("gif--","fragment back key is clicked");
                    getActivity().getSupportFragmentManager().popBackStack("gifPageTwoFragment", FragmentManager.POP_BACK_STACK_INCLUSIVE);
                    return true;
                }*/
               /* if (keyCode == KeyEvent.KEYCODE_BACK) {
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
                    ForecastFragment forecastFragment = new ForecastFragment();
                    fragmentTransaction.replace(R.id.container, forecastFragment);
                    //fragmentTransaction.addToBackStack(null);
                    fragmentTransaction.commit();
                    return true;
                }*/
                return false;
            }
        });
    }


}
