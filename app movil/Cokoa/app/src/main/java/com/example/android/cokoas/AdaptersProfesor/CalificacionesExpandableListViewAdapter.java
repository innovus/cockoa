package com.example.android.cokoas.AdaptersProfesor;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.android.cokoas.ActivityProfesor.LogrosMateriaEstudianteProfesorActivity;
import com.example.android.cokoas.ModelsProfesor.CursoProfesor;
import com.example.android.cokoas.ModelsProfesor.MateriaProfesor;
import com.example.android.cokoas.R;

import java.util.ArrayList;

/**
 * Created by juancarlospantoja@hotmail.com on 14/02/2017.
 */
public class CalificacionesExpandableListViewAdapter extends BaseExpandableListAdapter {
    private Context context;
    private ArrayList<MateriaProfesor> materiaProfesors;

    public CalificacionesExpandableListViewAdapter(Context context, ArrayList<MateriaProfesor> materiaProfesors) {
        this.context = context;
        this.materiaProfesors = materiaProfesors;
    }

    @Override
    public int getGroupCount() {
        return materiaProfesors.size();
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        /*  ArrayList<hijo> hijos = padres.get(groupPosition).getHijos();
        return hijos.size();*/
        ArrayList<CursoProfesor> cursoProfesors = materiaProfesors.get(groupPosition).getCursoProfesors();
        return cursoProfesors.size();
    }

    @Override
    public Object getGroup(int groupPosition) {
        return materiaProfesors.get(groupPosition);
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        /* ArrayList<hijo> hijos = padres.get(groupPosition).getHijos();
        return hijos.get(childPosition);*/
        ArrayList<CursoProfesor> cursoProfesors = materiaProfesors.get(groupPosition).getCursoProfesors();
        return cursoProfesors.get(childPosition);
    }

    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View view, ViewGroup parent) {
        MateriaProfesor materiaProfesor = (MateriaProfesor) getGroup(groupPosition);
        if(view==null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(R.layout.list_materia,null);
        }
        TextView lblListenerHeader = (TextView) view.findViewById(R.id.lblListHeader);
        lblListenerHeader.setText(materiaProfesor.getNombreMateria());
        return view;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View view, ViewGroup parent) {
        /*if(view==null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(R.layout.list_item,null);
        }
        hijo hi = (hijo) getChild(groupPosition,childPosition);
        TextView lblTextItem = (TextView) view.findViewById(R.id.lblListItem);
        lblTextItem.setText(hi.getGrado());
        return view;*/
        CursoProfesor cursoProfesor = (CursoProfesor) getChild(groupPosition,childPosition);
        final String idCargaDocente = cursoProfesor.getIdCargaProfesor();
        final String idCurso = cursoProfesor.getIdCcurso();
        final String nombreMateria = cursoProfesor.getNombreMateria();
        if(view==null){
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(R.layout.list_curso,null);

        }

        TextView lblTextItem = (TextView) view.findViewById(R.id.lblListItem);
        TextView txtCurso = (TextView) view.findViewById(R.id.txtcurso);

        lblTextItem.setText(cursoProfesor.getGrado());
        txtCurso.setText("-"+cursoProfesor.getCurso());


        LinearLayout linearLayout = (LinearLayout) view.findViewById(R.id.lnlcursos);
        linearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, LogrosMateriaEstudianteProfesorActivity.class);
                intent.putExtra("id_carda_docente",idCargaDocente);
                intent.putExtra("id_curso",idCurso);
                intent.putExtra("nombre_materia",nombreMateria);
                context.startActivity(intent);
            }
        });

        return view;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return true;
    }
}
