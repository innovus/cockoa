package com.example.android.cokoas.Adapters;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.cokoas.Models.InasistenciaMateria;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 30/06/2016.
 */

public class InasistenciaMateriaAdapters extends RecyclerView.Adapter<InasistenciaMateriaAdapters.ViewHolder> {
    public static ArrayList<InasistenciaMateria> inasistenciaMaterias;
    public static Activity activity;

    public InasistenciaMateriaAdapters(ArrayList<InasistenciaMateria>inasistenciaMaterias,Activity activity){
        super();
        this.inasistenciaMaterias= inasistenciaMaterias;
        this.activity= activity;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_materia_inasistencia, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {


        viewHolder.periodoInasistencia.setText(inasistenciaMaterias.get(position).getNumeroPeriodo());
        viewHolder.fechaInasistencia.setText(inasistenciaMaterias.get(position).getFechaInasistencia());
        viewHolder.tipoInasistencia.setText(inasistenciaMaterias.get(position).getTipoInasistencia());
        viewHolder.justificadaInasistencia.setText(inasistenciaMaterias.get(position).getJustificadaInasistencia());

    }

    @Override
    public int getItemCount() {
        return inasistenciaMaterias.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView  periodoInasistencia,fechaInasistencia,tipoInasistencia,justificadaInasistencia;
        public ViewHolder(View itemView) {
            super(itemView);


            periodoInasistencia  = (TextView) itemView.findViewById(R.id.id_text_periodo_inasistencia);
            fechaInasistencia  = (TextView) itemView.findViewById(R.id.id_text_fecha_inasistencia);
            tipoInasistencia  = (TextView) itemView.findViewById(R.id.id_text_tipo_inasistencia);
            justificadaInasistencia = (TextView) itemView.findViewById(R.id.id_text_justificada_inasistencia);

        }
    }
}
