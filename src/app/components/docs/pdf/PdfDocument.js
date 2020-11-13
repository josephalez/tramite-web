import React from "react";
import {Table, TableHeader, TableCell, TableBody, DataTableCell} from "@david.kucsai/react-pdf-table"
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';

const PdfDocument = (props) => {


    const styles = StyleSheet.create({
        titleContainer:{
            flexDirection: 'row',
            marginTop: 22,
            marginBottom:24,
        },
        reportTitle:{
            color: 'black',
            letterSpacing: 4,
            fontSize: 16,
            textAlign: 'center',
            textTransform: 'uppercase',
        },
        headerContainer: {
            flexDirection: 'row',
            borderWidth:1,
            borderBottomColor: '#bff0fd',
            borderBottomWidth: 1,
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'bold',
            flexGrow: 1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        description: {
            textAlign: 'left',       
            padding: 5,
            fontSize: 14,
            fontWeight:"light"
        },
    });

  let {documentData}= props;
  return (
        <Document>
            <Page style={{padding:8}} >
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>Hoja de ruta # {documentData.nro_tramite}</Text>
                </View>
                <View style={{marginBottom: 22}} >
                    <Table
                        data={[documentData]}
                        >
                        <TableHeader style={styles.headerContainer}>
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >Tipo</Text>
                            </TableCell>
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >Destino</Text>
                            </TableCell>
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >Folios</Text>
                            </TableCell>
                        </TableHeader>
                        <TableBody style={styles.row} >
                            <DataTableCell style={styles.description} getContent={(r) => r.tipo}/>
                            <DataTableCell style={styles.description} getContent={(r) => r.destino}/>
                            <DataTableCell style={styles.description} getContent={(r) => r.folios}/>
                        </TableBody>
                    </Table>
                </View>
                <View style={{marginBottom: 22}} >
                    <Table            
                        data={[documentData]}
                    >
                        <TableHeader style={styles.headerContainer} >
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >Administrado</Text>
                            </TableCell>
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >F. Registro</Text>
                            </TableCell>
                            <TableCell style={styles.description} >
                                <Text style={{fontWeight:"bold"}} >Estado</Text>
                            </TableCell>
                        </TableHeader>
                        <TableBody style={styles.row} >
                            <DataTableCell style={styles.description} getContent={(r) => r.administrado}/>
                            <DataTableCell style={styles.description} getContent={(r) => r.registro}/>
                            <DataTableCell style={styles.description} getContent={(r) => r.estado}/>
                        </TableBody>
                    </Table>
                </View>
                <View style={{marginBottom: 22}} >
                    <Table        
                        data={[documentData]}
                    >
                        <TableHeader style={styles.headerContainer} >
                        <TableCell style={styles.description} >
                            <Text style={{fontWeight:"bold"}} >Asunto</Text>
                        </TableCell>
                        </TableHeader>
                        <TableBody style={styles.row} >
                            <DataTableCell style={styles.description} getContent={(r) => r.asunto}/>
                        </TableBody>
                    </Table>
                </View>                
            </Page>
        </Document>
  );
};

export default PdfDocument