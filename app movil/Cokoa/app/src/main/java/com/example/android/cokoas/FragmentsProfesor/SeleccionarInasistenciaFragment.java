package com.example.android.cokoas.FragmentsProfesor;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.example.android.cokoas.AdaptersProfesor.InsertarInasistenciaAdapters;
import com.example.android.cokoas.AsyntaskProfesor.InsertInasistenciaAsyntask;
import com.example.android.cokoas.AsyntaskProfesor.ListaInasistenciaAsyntask;
import com.example.android.cokoas.ModelsProfesor.EstudianteCurso;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 14/08/2016.
 */
public class SeleccionarInasistenciaFragment extends Fragment {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private Button btnSelection;
    private TextView juan;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.activity_llamar_lista, container, false);
        // ((MainActivity) getActivity()).getSupportActionBar().setTitle("Llamar lista");
        return rootView;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        //btnSelection = (Button) getActivity().findViewById(R.id.buttonjuan);

        juan = (TextView) getActivity().findViewById(R.id.text_fecha_inasistencia);

        ArrayList<EstudianteCurso> estudianteCursos = new ArrayList<>();
        new ListaInasistenciaAsyntask(getActivity()).execute();
        mRecyclerView = (RecyclerView) getActivity().findViewById(R.id.my_recycler_view_llamrLista);
        mRecyclerView.setHasFixedSize(true);
        //usR UN ADMINISTRADOR PARA LINEARLAYOUT
        mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new InsertarInasistenciaAdapters(estudianteCursos, getActivity());
        mRecyclerView.setAdapter(mAdapter);

        /*btnSelection.setOnClickListener(new OnClickListener() {

   @Override
   public void onClick(View v) {*/

        btnSelection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               /* JSONArray jsonArray = new JSONArray();
                ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
                for (int i=0;i<estudianteCursos.size();i++){
                    EstudianteCurso estudianteCurso = estudianteCursos.get(i);
                    if(estudianteCurso.isInasistencia()==true){
                        JSONObject jsonObject = new JSONObject();
                        try {
                            jsonObject.put("id_periodo",1);
                            jsonObject.put("id_estudiante", Integer.parseInt(estudianteCurso.getCodigoEstudiante()));
                            jsonObject.put("fecha_inasistencia","02/02/2016");
                            jsonObject.put("id_carga","1");
                            jsonArray.put(jsonObject);
                            //{"id_periodo": 1, "id_estudiante":1 ,"estado_inasistencia":1,"fecha_inasistencia": "02/02/2016","id_carga": 1}

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }

                }

                Toast.makeText(getActivity(),"->"+jsonArray,Toast.LENGTH_LONG)
                        .show();*/
                ArrayList<EstudianteCurso> estudianteCursos = ((InsertarInasistenciaAdapters) mAdapter).getInasistencia();
                new InsertInasistenciaAsyntask(getActivity()).execute(estudianteCursos);




            }


        });
    }


}
