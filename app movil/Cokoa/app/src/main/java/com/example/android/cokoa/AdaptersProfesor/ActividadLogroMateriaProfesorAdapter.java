package com.example.android.cokoa.AdaptersProfesor;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoa.AsyntaskProfesor.EstudianteNotaActividadProfesorAsyntask;
import com.example.android.cokoa.ModelsProfesor.ActividadLogroProfesor;
import com.example.android.cokoa.R;

import java.util.ArrayList;

/**
 * Created by ASUS on 14/10/2016.
 */
public class ActividadLogroMateriaProfesorAdapter extends RecyclerView.Adapter<ActividadLogroMateriaProfesorAdapter.ViewHolder> {
    private int selectedPosition = -1;
    private ArrayList<ActividadLogroProfesor> actividadLogroProfesors;

    private static Activity activity;

    public ActividadLogroMateriaProfesorAdapter(ArrayList<ActividadLogroProfesor> actividadLogroProfesors, Activity activity) {
        super();
        this.actividadLogroProfesors = actividadLogroProfesors;
        this.activity = activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_nota_actividad_profesor, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(final ViewHolder viewHolder, final int position) {

        viewHolder.descripcionActividad.setText(actividadLogroProfesors.get(position).getNombreActividad());
        viewHolder.actividadLogroProfesor = actividadLogroProfesors.get(position);

    }

    @Override
    public int getItemCount() {
        return actividadLogroProfesors.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView descripcionActividad;


        ActividadLogroProfesor actividadLogroProfesor;

        public ViewHolder(final View itemView) {
            super(itemView);
            descripcionActividad = (TextView) itemView.findViewById(R.id.txt_nombre_actividad_docente);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {


                    new EstudianteNotaActividadProfesorAsyntask(activity).execute(actividadLogroProfesor.getIdActividad().toString());

                }
            });


        }
    }
}
