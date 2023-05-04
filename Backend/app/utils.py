
from shapely.ops import linemerge, unary_union, polygonize


def divide_region(pol, lin):
    try:
        po = wkt.loads(pol)
        li = wkt.loads(lin)
        merged = linemerge([po.boundary, li])
        borders = unary_union(merged)
        polygons = polygonize(borders)
        print("@@@@@@")
        print(polygons)
        print("@@@@@@")
        # for p in polygons:
        #     print(len(polygons))
        #     print("@@@@@@@@@@@")
        #     print(p)
        #     print("@@@@@@@@@@@")
    except Exception as e:
        print(e)




def cut_polygon_by_line(pol, lin):
    try:
        po = wkt.loads(pol)
        li = wkt.loads(lin)
        merged = linemerge([po.boundary, li])
        borders = unary_union(merged)
        polygons = polygonize(borders)

        print("@@@@@@")
        # print(list(polygons))
        print(polygons)
        print("@@@@@@")
    except Exception as e:
        print(e)

import  shapely
from shapely import wkt

def someFn(obj, line):
    try:
        po = obj.wkt
        li = wkt.loads(line)
        li.linemerge(po.boundary) # collection of individual linestrings for splitting in a list and add the polygon lines to it.
        merged_lines = shapely.ops.linemerge(li)
        border_lines = shapely.ops.unary_union(merged_lines)
        decomposition = shapely.ops.polygonize(border_lines)
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@")
        print(list(decomposition))
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@")
    except Exception as e:
        print(e)

