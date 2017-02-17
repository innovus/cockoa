package com.example.android.cokoas.AdaptersProfesor;

import android.app.Activity;
import android.graphics.Color;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.android.cokoas.AsyntaskProfesor.EstudianteNotaActividadProfesorAsyntask;
import com.example.android.cokoas.ModelsProfesor.ActividadLogroProfesor;
import com.example.android.cokoas.R;
import com.example.android.cokoas.SessionManager.SessionManager;

import java.util.ArrayList;

/**
 * Created by ASUS on 14/10/2016.
 */
public class ActividadLogroMateriaProfesorAdapter extends RecyclerView.Adapter<ActividadLogroMateriaProfesorAdapter.ViewHolder> {
    private int selectedPosition = -1;
    private ArrayList<ActividadLogroProfesor> actividadLogroProfesors;
    static SessionManager sessionManager;

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

        viewHolder.porcentajeActividadpanel.setText(actividadLogroProfesors.get(position).getPorcentajeActividad()+"%");
        viewHolder.descripcionActividad.setText(actividadLogroProfesors.get(position).getNombreActividad());
        viewHolder.actividadLogroProfesor = actividadLogroProfesors.get(position);

    }

    @Override
    public int getItemCount() {
        return actividadLogroProfesors.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView descripcionActividad,nombreActividadPanel,porcentajeActividad,porcentajeActividadpanel;
        ActividadLogroProfesor actividadLogroProfesor;
        LinearLayout panelInsertarNota;

        public ViewHolder(final View itemView) {
            super(itemView);
            porcentajeActividadpanel = (TextView) itemView.findViewById(R.id.txt_porcentaje_actividad_profesor);
            descripcionActividad = (TextView) itemView.findViewById(R.id.txt_nombre_actividad_docente);
            nombreActividadPanel = (TextView) activity.findViewById(R.id.txt_nombre_actividad_panel);
            porcentajeActividad = (TextView) activity.findViewById(R.id.porcentajeActividaPanel);
            panelInsertarNota = (LinearLayout) activity.findViewById(R.id.panelInsertarNota);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    nombreActividadPanel.setText(actividadLogroProfesor.getNombreActividad());
                    porcentajeActividad.setText(actividadLogroProfesor.getPorcentajeActividad()+"%");
                    panelInsertarNota.setVisibility(View.VISIBLE);
                    sessionManager = new SessionManager(activity);
                    if(sessionManager.connectionCheck(activity)) {
                        Log.v("status", "EstudianteNotaActividadProfesorAsyntask: " + actividadLogroProfesor.getIdActividad().toString()+" "+actividadLogroProfesor.getIdCurso()+" "+actividadLogroProfesor.getIdCargaDocente());
                        new EstudianteNotaActividadProfesorAsyntask(activity).execute(actividadLogroProfesor.getIdActividad().toString(),actividadLogroProfesor.getIdCurso(),actividadLogroProfesor.getIdCargaDocente());
                    }else{
                        Snackbar.make(activity.findViewById(android.R.id.content), "Comprueba la conexión de red o inténtalo de nuevo más tarde", Snackbar.LENGTH_LONG)
                                .setAction("", new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {

                                    }
                                })
                                .setActionTextColor(Color.YELLOW)
                                .show();
                    }


                }
            });


        }
    }
}
